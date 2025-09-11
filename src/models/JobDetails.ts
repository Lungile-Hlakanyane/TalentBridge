export interface JobDetails {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  applicants: number;
  shortlisted: number;
  rejected: number;
  postedDate: Date;
  status: 'approved' | 'pending' | 'rejected';
}