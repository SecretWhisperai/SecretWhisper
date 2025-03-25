import { ethers } from 'ethers'
import type { SecretWhisperContract, Message } from '@/contracts/types'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''
const CONTRACT_ABI = [
  'function sendMessage(address _to, bytes calldata _encryptedContent) external',
  'function authorize(address _address, bool _status) external',
  'function getMessages() external view returns (tuple(address sender, bytes encryptedContent, uint256 timestamp)[] memory)',
  'function isAuthorized(address _from) external view returns (bool)',
  'event MessageSent(address indexed from, address indexed to)',
  'event AuthorizationChanged(address indexed from, address indexed to, bool status)'
]

export class ContractService implements SecretWhisperContract {
  private contract: ethers.Contract
  private signer: ethers.Signer

  constructor(provider: ethers.providers.Web3Provider) {
    this.signer = provider.getSigner()
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.signer)
  }

  async sendMessage(to: string, encryptedContent: string): Promise<void> {
    const tx = await this.contract.sendMessage(to, encryptedContent)
    await tx.wait()
  }

  async authorize(address: string, status: boolean): Promise<void> {
    const tx = await this.contract.authorize(address, status)
    await tx.wait()
  }

  async getMessages(): Promise<Message[]> {
    const messages = await this.contract.getMessages()
    return messages.map((msg: any) => ({
      sender: msg.sender,
      encryptedContent: msg.encryptedContent,
      timestamp: msg.timestamp.toNumber()
    }))
  }

  async isAuthorized(from: string): Promise<boolean> {
    return await this.contract.isAuthorized(from)
  }
} 