import { Resume } from "./Resume";

export interface Candidate {
  id: number;
  name: string;
  email: string;
  appliedFor: string;
  status?:any; 
  phoneNumber?:any;
  location?:any;
  registeredDate?: Date;
  resumes?: Resume[];
  appliedJobs?: { id: number; title: string; company: string; location: string; status: string }[];
}