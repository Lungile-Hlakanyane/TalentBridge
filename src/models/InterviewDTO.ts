import { InterviewType } from "../enums/InterviewType";

export interface InterviewDTO{
  id?: number;
  userId: number;
  type: InterviewType;
  location?: string;
  platform?: string;
  companyName: string;
  interviewee: string;
  date: string | null;
  time: string | null;
  employerName?:any;
  employerEmail?:any;
  phoneNumber?:any;
  interviewType?:any;
}