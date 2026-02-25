import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

   private baseUrl = 'http://localhost:8080/uploads';

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
