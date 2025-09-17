export interface Job{
  id?:any;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements?: string[];
  userId?:number;
  created?:string;
  applicants?:number;
}