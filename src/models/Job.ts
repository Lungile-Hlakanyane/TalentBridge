export interface Job{
  id?:any;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements?: string[];
  userId?:number;
  created?:any;
  applicants?:number;
  salary?: string;
  approve?: any;
  status?:any;
  applications?: any;
}