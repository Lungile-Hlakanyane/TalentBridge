export interface Enquiry{
  id: string;
  name: string;
  email: string;
  company?: string;
  subject: 'hiring' | 'job' | 'partnership' | 'support';
  message: string;
  createdAt: Date;
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED'; 
  fullName?:any;
}