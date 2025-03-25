import React from 'react';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Box,
    Chip
} from '@mui/material';
import { Channel } from '@/contracts/types';
import { shortenAddress } from '@/utils/web3';

interface ChannelListProps {
    channels: Channel[];
    currentAddress: string;
    selectedChannelId: string | null;
    onSelectChannel: (channelId: string) => void;
}

export function ChannelList({
    channels,
    currentAddress,
    selectedChannelId,
    onSelectChannel
}: ChannelListProps) {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {channels.map((channel) => {
                const otherParticipant = channel.participant === currentAddress
                    ? channel.creator
                    : channel.participant;

                return (
                    <ListItem
                        key={`${channel.creator}-${channel.participant}`}
                        disablePadding
                        secondaryAction={
                            !channel.isActive && (
                                <Chip
                                    label="Closed"
                                    size="small"
                                    color="error"
                                    variant="outlined"
                                />
                            )
                        }
                    >
                        <ListItemButton
                            selected={selectedChannelId === channel.creator + channel.participant}
                            onClick={() => onSelectChannel(channel.creator + channel.participant)}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    {otherParticipant.substring(2, 4).toUpperCase()}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={shortenAddress(otherParticipant)}
                                secondary={
                                    <Box component="span" sx={{ display: 'flex', gap: 1 }}>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Created: {new Date(channel.createdAt * 1000).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
} 