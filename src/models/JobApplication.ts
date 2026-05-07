export interface JobApplication {
 id?: number;
  jobId: number;
  applicantName: string;
  applicantEmail: string;
  coverLetter: string;
  resumePath?: string; 
  status?: string;
  appliedAt?: string;
}
