import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VehiculoService } from '../../services/vehiculo.service';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  totalVehiculos: number = 0;
  ingresosTotales: number = 0;
  vehiculoMasAntiguo: string = '';

  private vehiculoService = inject(VehiculoService);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.vehiculoService.getVehiculos().subscribe((data) => {
      this.totalVehiculos = data.length;
      this.ingresosTotales = data.reduce(
        (total, vehiculo) => total + this.calcularTarifa(vehiculo),
        0
      );

      if (data.length > 0) {
        const vehiculoAntiguo = data.reduce((prev, curr) =>
          new Date(prev.horaIngreso) < new Date(curr.horaIngreso) ? prev : curr
        );
        this.vehiculoMasAntiguo = vehiculoAntiguo.placa;
      }
    });
  }

  calcularTarifa(vehiculo: any): number {
    const tarifaPorMinuto =
      vehiculo.tipo === 'Carro' ? 110 : vehiculo.tipo === 'Moto' ? 50 : 10;
    const tiempoEnMinutos =
      (new Date().getTime() - new Date(vehiculo.horaIngreso).getTime()) / 60000;
    return Math.round(tiempoEnMinutos * tarifaPorMinuto);
  }


  irAVehiculos() {
    console.log('🔄 Redirigiendo a /vehiculo...'); // 🔹 Mensaje en la consola
    this.router.navigate(['/vehiculos']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
