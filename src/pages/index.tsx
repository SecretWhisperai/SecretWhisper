import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Box, Container, Typography, Button, TextField, Grid } from '@mui/material';
import { useWeb3 } from '@/contexts/Web3Context';
import { MessageList } from '@/components/MessageList';
import { MessageInput } from '@/components/MessageInput';
import { ChannelList } from '@/components/ChannelList';
import { LoadingState } from '@/components/LoadingState';
import { ErrorMessage } from '@/components/ErrorMessage';
import { encryptMessage } from '@/utils/encryption';
import type { Message, Channel } from '@/contracts/types';

export default function Home() {
    const { account, connect, contract, isConnecting, error: web3Error } = useWeb3();
    const [recipient, setRecipient] = useState('');
    const [channelId, setChannelId] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [channels, setChannels] = useState<Channel[]>([]);
    const [channel, setChannel] = useState<Channel | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (contract && account) {
            loadChannels();
        }
    }, [contract, account]);

    useEffect(() => {
        if (contract && channelId) {
            loadMessages();
            const interval = setInterval(loadMessages, 5000);
            return () => clearInterval(interval);
        }
    }, [contract, channelId]);

    const loadChannels = async () => {
        if (!contract || !account) return;
        try {
            setIsLoading(true);
            const channelIds = await contract.getUserChannels(account);
            const channelDetails = await Promise.all(
                channelIds.map(id => contract.channels(id))
            );
            setChannels(channelDetails);
        } catch (err) {
            setError('Failed to load channels');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const loadMessages = async () => {
        if (!contract || !channelId) return;
        try {
            const messages = await contract.getMessages(channelId);
            setMessages(messages);
        } catch (err) {
            setError('Failed to load messages');
            console.error(err);
        }
    };

    const handleCreateChannel = async () => {
        if (!contract || !recipient) return;
        try {
            setIsLoading(true);
            setError(null);
            const newChannelId = await contract.createChannel(recipient);
            const channelInfo = await contract.channels(newChannelId);
            setChannel(channelInfo);
            setChannelId(newChannelId);
            await loadChannels();
        } catch (err) {
            setError('Failed to create channel');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (message: string) => {
        if (!contract || !channelId || !channel) return;
        try {
            setError(null);
            const recipientAddress = channel.participant === account ? channel.creator : channel.participant;
            const encryptedContent = await encryptMessage(message, recipientAddress);
            await contract.sendMessage(channelId, encryptedContent);
            await loadMessages();
        } catch (err) {
            setError('Failed to send message');
            console.error(err);
        }
    };

    const handleSelectChannel = (channelId: string) => {
        setChannelId(channelId);
        const selectedChannel = channels.find(
            c => c.creator + c.participant === channelId
        );
        setChannel(selectedChannel || null);
    };

    if (isConnecting) {
        return <LoadingState message="Connecting to wallet..." />;
    }

    if (web3Error) {
        return (
            <ErrorMessage
                title="Connection Error"
                message={web3Error.message}
                onRetry={connect}
            />
        );
    }

    return (
        <>
            <Head>
                <title>SecretWhisper - Secure Decentralized Communication</title>
                <meta name="description" content="SecretWhisper - A secure, decentralized communication platform enabling private and encrypted messaging across blockchain networks." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/logo.svg" type="image/svg+xml" />
            </Head>
            <Container maxWidth="lg">
                <Box sx={{ my: 4, textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                        <Image
                            src="/logo.svg"
                            alt="SecretWhisper Logo"
                            width={120}
                            height={120}
                            priority
                        />
                    </Box>
                    <Typography variant="h1" component="h1" gutterBottom align="center">
                        SecretWhisper
                    </Typography>
                    <Typography variant="h2" component="h2" gutterBottom align="center">
                        Secure. Private. Decentralized.
                    </Typography>

                    {!account ? (
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Button variant="contained" onClick={connect}>
                                Connect Wallet
                            </Button>
                        </Box>
                    ) : (
                        <Grid container spacing={3} sx={{ mt: 2 }}>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ mb: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="Recipient Address"
                                        value={recipient}
                                        onChange={(e) => setRecipient(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={handleCreateChannel}
                                        disabled={!recipient || isLoading}
                                        sx={{ mt: 1 }}
                                    >
                                        Create Channel
                                    </Button>
                                </Box>
                                {isLoading ? (
                                    <LoadingState message="Loading channels..." />
                                ) : (
                                    <ChannelList
                                        channels={channels}
                                        currentAddress={account}
                                        selectedChannelId={channelId}
                                        onSelectChannel={handleSelectChannel}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={12} md={8}>
                                {error && (
                                    <ErrorMessage
                                        message={error}
                                        onRetry={() => setError(null)}
                                    />
                                )}
                                {channelId ? (
                                    <>
                                        <MessageList
                                            messages={messages}
                                            currentAddress={account}
                                        />
                                        <MessageInput
                                            onSend={handleSendMessage}
                                            disabled={!channel?.isActive}
                                        />
                                    </>
                                ) : (
                                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                                        <Typography variant="body1" color="text.secondary">
                                            Select a channel or create a new one to start messaging
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Container>
        </>
    );
} 