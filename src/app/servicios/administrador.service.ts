import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Administrador {
  id?: number;
  nombre: string;
  email: string;
  contraseña: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private readonly baseUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  crearAdministrador(admin: Administrador): Observable<Administrador> {
    return this.http.post<Administrador>(`${this.baseUrl}`, admin);
  }

  listar(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(`${this.baseUrl}`);
  }

  obtener(id: number): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.baseUrl}/${id}`);
  }

  eliminar(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  login(email: string, contrasena: string): Observable<Administrador> {
    return this.http.post<Administrador>(`${this.baseUrl}/login`, { email, contrasena });
  }
}