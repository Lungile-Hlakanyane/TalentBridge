export interface Application {
  candidateId?: any
  id: number;
  title: string;
  company: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  appliedDate: Date;
  candidateName?:string;
  position?:string;
  jobId:any;
}