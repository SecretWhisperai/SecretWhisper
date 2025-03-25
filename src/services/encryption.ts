import { ethers } from 'ethers'

export class EncryptionService {
  private static readonly ENCRYPTION_VERSION = '1'
  private static readonly ALGORITHM = 'aes-256-gcm'

  static async encryptMessage(message: string, recipientPublicKey: string): Promise<string> {
    const messageBytes = ethers.utils.toUtf8Bytes(message)
    const ephemeralWallet = ethers.Wallet.createRandom()
    const sharedSecret = await this.computeSharedSecret(ephemeralWallet, recipientPublicKey)
    
    const iv = ethers.utils.randomBytes(12)
    const key = ethers.utils.arrayify(sharedSecret).slice(0, 32)
    
    const encryptedData = await this.aesEncrypt(messageBytes, key, iv)
    const ephemeralPublicKey = ethers.utils.arrayify(ephemeralWallet.publicKey)
    
    const combined = ethers.utils.concat([
      [this.ENCRYPTION_VERSION.charCodeAt(0)],
      ephemeralPublicKey,
      iv,
      encryptedData
    ])
    
    return ethers.utils.hexlify(combined)
  }

  static async decryptMessage(encryptedMessage: string, privateKey: string): Promise<string> {
    const wallet = new ethers.Wallet(privateKey)
    const data = ethers.utils.arrayify(encryptedMessage)
    
    const version = String.fromCharCode(data[0])
    if (version !== this.ENCRYPTION_VERSION) {
      throw new Error('Unsupported encryption version')
    }
    
    const ephemeralPublicKey = ethers.utils.hexlify(data.slice(1, 65))
    const iv = data.slice(65, 77)
    const encryptedData = data.slice(77)
    
    const sharedSecret = await this.computeSharedSecret(wallet, ephemeralPublicKey)
    const key = ethers.utils.arrayify(sharedSecret).slice(0, 32)
    
    const decryptedBytes = await this.aesDecrypt(encryptedData, key, iv)
    return ethers.utils.toUtf8String(decryptedBytes)
  }

  private static async computeSharedSecret(wallet: ethers.Wallet, publicKey: string): Promise<string> {
    return ethers.utils.keccak256(
      ethers.utils.arrayify(
        await wallet.signMessage(ethers.utils.arrayify(publicKey))
      )
    )
  }

  private static async aesEncrypt(data: Uint8Array, key: Uint8Array, iv: Uint8Array): Promise<Uint8Array> {
    const subtle = crypto.subtle
    const importedKey = await subtle.importKey(
      'raw',
      key,
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    )
    
    const encrypted = await subtle.encrypt(
      {
        name: 'AES-GCM',
        iv
      },
      importedKey,
      data
    )
    
    return new Uint8Array(encrypted)
  }

  private static async aesDecrypt(data: Uint8Array, key: Uint8Array, iv: Uint8Array): Promise<Uint8Array> {
    const subtle = crypto.subtle
    const importedKey = await subtle.importKey(
      'raw',
      key,
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    )
    
    const decrypted = await subtle.decrypt(
      {
        name: 'AES-GCM',
        iv
      },
      importedKey,
      data
    )
    
    return new Uint8Array(decrypted)
  }
} 