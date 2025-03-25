export interface Message {
  sender: string;
  encryptedContent: string;
  timestamp: number;
}

export interface SecretWhisperContract {
  sendMessage: (to: string, encryptedContent: string) => Promise<void>;
  authorize: (address: string, status: boolean) => Promise<void>;
  getMessages: () => Promise<Message[]>;
  isAuthorized: (from: string) => Promise<boolean>;
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