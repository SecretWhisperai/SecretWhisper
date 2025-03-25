import React, { useState, useCallback } from 'react';
import {
    Box,
    Button,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    CircularProgress
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { encryptFile, decryptFile } from '@/shared/utils/encryption';

interface FileData {
    id: string;
    name: string;
    size: number;
    uploadedAt: string;
    sender: string;
}

interface FileSharingProps {
    channelId: string;
    currentAddress: string;
    onFileUpload: (file: File, encryptedData: ArrayBuffer) => Promise<void>;
    onFileDownload: (fileId: string) => Promise<ArrayBuffer>;
    files: FileData[];
}

export function FileSharing({
    channelId,
    currentAddress,
    onFileUpload,
    onFileDownload,
    files
}: FileSharingProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        try {
            setIsUploading(true);
            for (const file of acceptedFiles) {
                const reader = new FileReader();
                reader.onload = async () => {
                    try {
                        const encryptedData = await encryptFile(
                            reader.result as ArrayBuffer,
                            channelId
                        );
                        await onFileUpload(file, encryptedData);
                    } catch (error) {
                        console.error('File encryption failed:', error);
                    }
                };
                reader.readAsArrayBuffer(file);
            }
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    }, [channelId, onFileUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxSize: 50 * 1024 * 1024 // 50MB limit
    });

    const handleDownload = async (fileId: string, fileName: string) => {
        try {
            const encryptedData = await onFileDownload(fileId);
            const decryptedData = await decryptFile(encryptedData, channelId);
            
            const blob = new Blob([decryptedData]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('File download failed:', error);
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Box
                {...getRootProps()}
                sx={{
                    border: '2px dashed',
                    borderColor: isDragActive ? 'primary.main' : 'grey.300',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer'
                }}
            >
                <input {...getInputProps()} />
                {isUploading ? (
                    <CircularProgress variant="determinate" value={uploadProgress} />
                ) : (
                    <Typography>
                        {isDragActive
                            ? 'Drop files here...'
                            : 'Drag and drop files here, or click to select files'}
                    </Typography>
                )}
            </Box>

            <List>
                {files.map((file) => (
                    <ListItem
                        key={file.id}
                        secondaryAction={
                            <IconButton
                                edge="end"
                                onClick={() => handleDownload(file.id, file.name)}
                            >
                                Download
                            </IconButton>
                        }
                    >
                        <ListItemIcon>
                            File
                        </ListItemIcon>
                        <ListItemText
                            primary={file.name}
                            secondary={`Uploaded by ${file.sender === currentAddress ? 'you' : file.sender} on ${new Date(file.uploadedAt).toLocaleString()}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
} 