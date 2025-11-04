import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyInformationDTO } from '../../models/CompanyInformationDTO';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = 'http://localhost:8080/api/company-info';

  constructor(private http: HttpClient) { }

   createCompanyInfo(data: CompanyInformationDTO): Observable<CompanyInformationDTO> {
    const formData = new FormData();
    formData.append('description', data.companyDescription);
    formData.append('taxNumber', data.taxNumber);
    formData.append('registeredAddress', data.registeredAddress);

    if (data.registrationDocument) {
      formData.append('registrationDocument', data.registrationDocument);
    }
    if (data.taxClearanceDocument) {
      formData.append('taxClearanceDocument', data.taxClearanceDocument);
    }
    if (data.leaseAgreement) {
      formData.append('leaseAgreement', data.leaseAgreement);
    }
    if (data.userId) {
      formData.append('userId', data.userId.toString());
    }

    return this.http.post<CompanyInformationDTO>(`${this.baseUrl}/create`, formData);
  }

  getCompanyInfoByUserId(userId: number): Observable<CompanyInformationDTO> {
    return this.http.get<CompanyInformationDTO>(`${this.baseUrl}/user/${userId}`);
  }

  getAllCompanyInfos(): Observable<CompanyInformationDTO[]> {
    return this.http.get<CompanyInformationDTO[]>(`${this.baseUrl}/all`);
  }

  deleteCompanyInfo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

updateCompanyInfo(data: CompanyInformationDTO): Observable<CompanyInformationDTO> {
  const formData = new FormData();
  formData.append('companyDescription', data.companyDescription);
  formData.append('taxNumber', data.taxNumber);
  formData.append('registeredAddress', data.registeredAddress);

  if (data.registrationDocument) {
    formData.append('registrationDocument', data.registrationDocument);
  }
  if (data.taxClearanceDocument) {
    formData.append('taxClearanceDocument', data.taxClearanceDocument);
  }
  if (data.leaseAgreement) {
    formData.append('leaseAgreement', data.leaseAgreement);
  }

  return this.http.put<CompanyInformationDTO>(
    `${this.baseUrl}/update/${data.userId}`,
    formData
  );
}

}
