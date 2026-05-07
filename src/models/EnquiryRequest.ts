export interface EnquiryRequest{
  fullName: string;
  email: string;
  company?: string;
  subject: 'HIRING' | 'JOB' | 'PARTNERSHIP' | 'SUPPORT';
  message: string;
}