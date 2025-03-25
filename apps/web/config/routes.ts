export const ROUTES = {
  HOME: '/',
  CHAT: '/chat',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  GROUP: '/group',
  FILES: '/files'
};

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register'
  },
  MESSAGES: {
    SEND: '/api/messages/send',
    LIST: '/api/messages/list',
    DELETE: '/api/messages/delete',
    EDIT: '/api/messages/edit'
  },
  CHANNELS: {
    CREATE: '/api/channels/create',
    LIST: '/api/channels/list',
    CLOSE: '/api/channels/close'
  },
  FILES: {
    UPLOAD: '/api/files/upload',
    DOWNLOAD: '/api/files/download',
    LIST: '/api/files/list'
  },
  GROUPS: {
    CREATE: '/api/groups/create',
    JOIN: '/api/groups/join',
    LEAVE: '/api/groups/leave',
    LIST: '/api/groups/list'
  }
}; 