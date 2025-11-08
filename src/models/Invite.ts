export interface Invite {
  displayName: string;
  displayExtra: string;
  id: number;
  senderId?: number;
  receiverId?: number;
  senderName?: string;
  recipientEmail?: string;
  subject: string;
  message: string;
  sentDate?: string;
  status?: string;
}