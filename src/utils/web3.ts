import { InjectedConnector } from '@web3-react/injected-connector'
import { ethers } from 'ethers'

export const injected = new InjectedConnector({
  supportedChainIds: [1, 137], // Ethereum Mainnet and Polygon
})

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export const shortenAddress = (address: string): string => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

export const isValidAddress = (address: string): boolean => {
  try {
    ethers.utils.getAddress(address)
    return true
  } catch {
    return false
  }
} 