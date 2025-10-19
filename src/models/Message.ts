export interface Message{
  content: string;
  sender: 'employee' | 'employer';
  timestamp: Date;
}