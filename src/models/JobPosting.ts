export interface JobPosting {
  id: number;
  title: string;
  company: string;
  location: string;
  status: 'approved' | 'pending' | 'rejected';
}