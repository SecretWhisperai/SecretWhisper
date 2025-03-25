import { ethers } from 'ethers';

export class EncryptionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EncryptionError';
    }
}

export async function encryptFile(
    data: ArrayBuffer,
    channelId: string
): Promise<ArrayBuffer> {
    try {
        // Generate a random key for file encryption
        const key = await window.crypto.subtle.generateKey(
            {
                name: 'AES-GCM',
                length: 256
            },
            true,
            ['encrypt', 'decrypt']
        );

        // Generate random IV
        const iv = crypto.getRandomValues(new Uint8Array(12));

        // Encrypt the file data
        const encryptedData = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            data
        );

        // Export the key
        const exportedKey = await window.crypto.subtle.exportKey('raw', key);

        // Combine the encrypted key, IV, and encrypted data
        const combinedData = new Uint8Array(
            iv.length + exportedKey.byteLength + encryptedData.byteLength
        );
        combinedData.set(iv, 0);
        combinedData.set(new Uint8Array(exportedKey), iv.length);
        combinedData.set(
            new Uint8Array(encryptedData),
            iv.length + exportedKey.byteLength
        );

        return combinedData.buffer;
    } catch (error) {
        throw new EncryptionError(`Failed to encrypt file: ${error.message}`);
    }
}

export async function decryptFile(
    encryptedData: ArrayBuffer,
    channelId: string
): Promise<ArrayBuffer> {
    try {
        const data = new Uint8Array(encryptedData);

        // Extract IV, key, and encrypted data
        const iv = data.slice(0, 12);
        const exportedKey = data.slice(12, 44);
        const encryptedContent = data.slice(44);

        // Import the key
        const key = await window.crypto.subtle.importKey(
            'raw',
            exportedKey,
            { name: 'AES-GCM' },
            false,
            ['decrypt']
        );

        // Decrypt the data
        const decryptedData = await window.crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            encryptedContent
        );

        return decryptedData;
    } catch (error) {
        throw new EncryptionError(`Failed to decrypt file: ${error.message}`);
    }
} 