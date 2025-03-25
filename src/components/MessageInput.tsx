import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface MessageInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export function MessageInput({ onSend, disabled = false }: MessageInputProps) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            onSend(message.trim());
            setMessage('');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                gap: 1,
                p: 2,
                borderTop: 1,
                borderColor: 'divider',
            }}
        >
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={disabled}
                size="small"
            />
            <IconButton
                type="submit"
                color="primary"
                disabled={disabled || !message.trim()}
            >
                <SendIcon />
            </IconButton>
        </Box>
    );
} 