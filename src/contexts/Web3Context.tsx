import React, { createContext, useContext, useEffect, useState } from 'react';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { injected } from '@/utils/web3';
import type { SecretWhisperContract } from '@/contracts/types';

interface Web3ContextType {
    account: string | null;
    connect: () => Promise<void>;
    disconnect: () => void;
    contract: SecretWhisperContract | null;
    isConnecting: boolean;
    error: Error | null;
}

const Web3Context = createContext<Web3ContextType>({
    account: null,
    connect: async () => {},
    disconnect: () => {},
    contract: null,
    isConnecting: false,
    error: null,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
    const { activate, deactivate, account, library } = useWeb3React();
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [contract, setContract] = useState<SecretWhisperContract | null>(null);

    const connect = async () => {
        setIsConnecting(true);
        setError(null);
        try {
            await activate(injected);
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnect = () => {
        deactivate();
    };

    useEffect(() => {
        if (library && account) {
            // Initialize contract here when deployed
            // const contractAddress = "YOUR_CONTRACT_ADDRESS";
            // const contract = new ethers.Contract(
            //     contractAddress,
            //     SecretWhisperABI,
            //     library.getSigner()
            // );
            // setContract(contract as unknown as SecretWhisperContract);
        } else {
            setContract(null);
        }
    }, [library, account]);

    return (
        <Web3Context.Provider
            value={{
                account,
                connect,
                disconnect,
                contract,
                isConnecting,
                error,
            }}
        >
            {children}
        </Web3Context.Provider>
    );
}

export function useWeb3() {
    return useContext(Web3Context);
} 