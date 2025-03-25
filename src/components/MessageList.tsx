import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import type { Message } from '@/contracts/types';

interface MessageListProps {
    messages: Message[];
    currentAddress: string;
}

export function MessageList({ messages, currentAddress }: MessageListProps) {
    return (
        <Box sx={{ mt: 2, maxHeight: '60vh', overflowY: 'auto' }}>
            {messages.map((message, index) => (
                <Paper
                    key={`${message.timestamp}-${index}`}
                    sx={{
                        p: 2,
                        mb: 1,
                        backgroundColor: message.sender === currentAddress ? 'primary.dark' : 'background.paper',
                        ml: message.sender === currentAddress ? 'auto' : 0,
                        mr: message.sender === currentAddress ? 0 : 'auto',
                        maxWidth: '80%',
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="body1">
                        {message.encryptedContent}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {new Date(message.timestamp * 1000).toLocaleString()}
                    </Typography>
                </Paper>
            ))}
        </Box>
    );
} 