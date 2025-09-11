export interface Application {
  candidateId?: any
  id: number;
  jobTitle: string;
  company: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  appliedDate: Date;
  candidateName?:string;
  position?:string;
}