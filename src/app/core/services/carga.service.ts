import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ServiceResult } from '../models/service-result';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CargaService {
  private url = `${environment.apiUrl}/api/carga`;
  constructor(private http: HttpClient) {}

  CargaExcel(archivo: File): Observable<ServiceResult<string>> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    return this.http.post<ServiceResult<string>>(`${this.url}/excel`, formData);
  }
}
