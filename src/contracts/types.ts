export interface Message {
  sender: string;
  encryptedContent: string;
  timestamp: number;
  isRead: boolean;
}

export interface Channel {
  creator: string;
  participant: string;
  isActive: boolean;
  createdAt: number;
}

export interface SecretWhisperContract {
  createChannel: (participant: string) => Promise<string>;
  sendMessage: (channelId: string, encryptedContent: string) => Promise<void>;
  getMessages: (channelId: string) => Promise<Message[]>;
  closeChannel: (channelId: string) => Promise<void>;
  getUserChannels: (user: string) => Promise<string[]>;
  channels: (channelId: string) => Promise<Channel>;
}

export interface AuthorizationChangedEvent {
  from: string;
  to: string;
  status: boolean;
}

export interface MessageSentEvent {
  from: string;
  to: string;
} 