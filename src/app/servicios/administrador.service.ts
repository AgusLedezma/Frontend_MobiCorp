import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private backendUrl = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient) { }

  getAdministradores(): Observable<any> {
    return this.http.get(`${this.backendUrl}`);
  }

  getAdministradorById(id: number): Observable<any> {
    return this.http.get(`${this.backendUrl}/${id}`);
  }

  createAdministrador(administrador: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/add`, administrador);
  }

  deleteAdministrador(id: number): Observable<any> {
    return this.http.delete(`${this.backendUrl}/${id}`);
  }
}
