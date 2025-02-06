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
  vehiculosHoy: number = 0;
  vehiculosActuales: number = 0;
  ingresosHoy: number = 0;

  private vehiculoService = inject(VehiculoService);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.vehiculoService.getVehiculos().subscribe((vehiculos) => {
      const hoy = new Date().setHours(0, 0, 0, 0);

      this.vehiculosHoy = vehiculos.filter(
        (v) => new Date(v.horaIngreso).setHours(0, 0, 0, 0) === hoy
      ).length;

      this.vehiculosActuales = vehiculos.filter((v) => !v.horaSalida).length;

      this.ingresosHoy = vehiculos
        .filter(
          (v) =>
            v.horaSalida && new Date(v.horaSalida).setHours(0, 0, 0, 0) === hoy
        )
        .reduce((sum, v) => sum + (v.valorPagado || 0), 0);
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
    console.log('🔄 Redirigiendo a /vehiculo...');
    this.router.navigate(['/vehiculos']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
