export interface Employer {
  id: number;
  companyName: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  description?: string;
  registeredDate?:any;
  jobs?:any;
  activityHistory?:any
}