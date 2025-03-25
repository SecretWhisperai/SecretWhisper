import { ethers } from 'ethers';

export class EncryptionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EncryptionError';
    }
}

export async function generateKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
    const wallet = ethers.Wallet.createRandom();
    return {
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey
    };
}

export async function encryptMessage(
    message: string,
    recipientPublicKey: string
): Promise<string> {
    try {
        const encoder = new TextEncoder();
        const messageBytes = encoder.encode(message);
        
        // Generate ephemeral key pair for perfect forward secrecy
        const ephemeralWallet = ethers.Wallet.createRandom();
        const sharedSecret = await deriveSharedSecret(ephemeralWallet.privateKey, recipientPublicKey);
        
        // Generate random IV
        const iv = crypto.getRandomValues(new Uint8Array(12));
        
        // Encrypt the message
        const encryptedData = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            await importAESKey(sharedSecret),
            messageBytes
        );
        
        // Combine ephemeral public key, IV, and encrypted data
        return ethers.utils.hexlify(
            ethers.utils.concat([
                ephemeralWallet.publicKey,
                iv,
                new Uint8Array(encryptedData)
            ])
        );
    } catch (error) {
        throw new EncryptionError(`Failed to encrypt message: ${error.message}`);
    }
}

export async function decryptMessage(
    encryptedMessage: string,
    privateKey: string
): Promise<string> {
    try {
        const encryptedData = ethers.utils.arrayify(encryptedMessage);
        const ephemeralPublicKey = encryptedData.slice(0, 65);
        const iv = encryptedData.slice(65, 77);
        const ciphertext = encryptedData.slice(77);
        
        const sharedSecret = await deriveSharedSecret(privateKey, ephemeralPublicKey);
        
        const decryptedData = await window.crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            await importAESKey(sharedSecret),
            ciphertext
        );
        
        const decoder = new TextDecoder();
        return decoder.decode(decryptedData);
    } catch (error) {
        throw new EncryptionError(`Failed to decrypt message: ${error.message}`);
    }
}

async function deriveSharedSecret(privateKey: string, publicKey: string): Promise<Uint8Array> {
    try {
        const privKeyBuffer = ethers.utils.arrayify(privateKey);
        const pubKeyBuffer = ethers.utils.arrayify(publicKey);
        
        const privateKeyImported = await window.crypto.subtle.importKey(
            'raw',
            privKeyBuffer,
            { name: 'ECDH', namedCurve: 'P-256' },
            false,
            ['deriveKey', 'deriveBits']
        );
        
        const publicKeyImported = await window.crypto.subtle.importKey(
            'raw',
            pubKeyBuffer,
            { name: 'ECDH', namedCurve: 'P-256' },
            false,
            []
        );
        
        const sharedBits = await window.crypto.subtle.deriveBits(
            {
                name: 'ECDH',
                public: publicKeyImported
            },
            privateKeyImported,
            256
        );
        
        return new Uint8Array(sharedBits);
    } catch (error) {
        throw new EncryptionError(`Failed to derive shared secret: ${error.message}`);
    }
}

async function importAESKey(keyData: Uint8Array): Promise<CryptoKey> {
    try {
        return await window.crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'AES-GCM' },
            false,
            ['encrypt', 'decrypt']
        );
    } catch (error) {
        throw new EncryptionError(`Failed to import AES key: ${error.message}`);
    }
} 