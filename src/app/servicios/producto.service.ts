import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private backendUrl = "http://localhost:8080/api/productos";

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(`${this.backendUrl}`);
  }

  getProductoById(id: number): Observable<any> {
    return this.http.get(`${this.backendUrl}/${id}`);
  }

  createProducto(producto: any): Observable<any> {
    return this.http.post(`${this.backendUrl}`, producto);
  }

  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.backendUrl}/${id}`, producto);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.backendUrl}/${id}`);
  }
}
