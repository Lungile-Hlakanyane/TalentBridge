export interface CompanyInformationDTO {
  id?: number;
  companyDescription: string;
  taxNumber: string;
  registeredAddress: string;
  registrationDocument?: File | null;
  taxClearanceDocument?: File | null;
  leaseAgreement?: File | null;
  userId?: number;
}