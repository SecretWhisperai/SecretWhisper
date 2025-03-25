import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

interface ErrorMessageProps {
    title?: string;
    message: string;
    onRetry?: () => void;
}

export function ErrorMessage({
    title = 'Error',
    message,
    onRetry
}: ErrorMessageProps) {
    return (
        <Box sx={{ my: 2 }}>
            <Alert
                severity="error"
                action={
                    onRetry && (
                        <button
                            onClick={onRetry}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '4px 8px',
                                cursor: 'pointer',
                                color: 'inherit',
                                textDecoration: 'underline'
                            }}
                        >
                            Retry
                        </button>
                    )
                }
            >
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        </Box>
    );
} 