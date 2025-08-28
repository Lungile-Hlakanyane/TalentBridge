export interface Application {
  id: number;
  jobTitle: string;
  company: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  appliedDate: Date;
}