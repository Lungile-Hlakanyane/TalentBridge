export interface PendingApproval {
  id: number;
  name: string;
  type: string; // Candidate, Employer, Job
  email?: string;
  submittedDate: Date;
}