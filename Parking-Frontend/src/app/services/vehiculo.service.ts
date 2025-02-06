import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private apiUrl = 'http://localhost:5135/api/vehiculo';
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getVehiculos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  registrarVehiculo(vehiculo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, vehiculo, {
      headers: this.getAuthHeaders(),
    });
  }

  calcularSalida(id: number, numeroFactura: string | null): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/calcular-salida/${id}`,
      { numeroFactura },
      { headers: this.getAuthHeaders() }
    );
  }

  eliminarVehiculo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
