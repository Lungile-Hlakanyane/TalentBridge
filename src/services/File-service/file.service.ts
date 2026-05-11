import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

   private baseUrl = `${environment.apiUrl}/uploads`;
   
  //  private baseUrl = 'http://http://10.28.168.224:80800/uploads';

  constructor(private http: HttpClient) { }

  /**
   * Get a PDF file as a Blob to download or preview
   * @param filename Name of the file
   */

  getFile(filename: string): Observable<Blob> {
   return this.http.get(`${this.baseUrl}/${filename}`, { responseType: 'blob' });
  }
  
  openFile(filename: string) {
    this.getFile(filename).subscribe(response => {
     const url = window.URL.createObjectURL(response);
     window.open(url, '_blank');
    });
  }

}
