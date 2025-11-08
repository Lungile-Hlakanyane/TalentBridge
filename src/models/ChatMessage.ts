export interface ChatMessage {
  id?: number;
  senderId: number;
  receiverId: number;
  message: string;
  timestamp?: string;
  readStatus?: boolean;
}