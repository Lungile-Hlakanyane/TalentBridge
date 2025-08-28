export interface Chat {
  id: number;
  sender: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
}