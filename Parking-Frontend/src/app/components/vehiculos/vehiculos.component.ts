import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculoService } from '../../services/vehiculo.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogSalidaComponent } from '../dialog-salida/dialog-salida.component';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    FormsModule,
  ],
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss'],
})
export class VehiculosComponent {
  vehiculos: any[] = [];
  vehiculosFiltrados: any[] = [];
  placa: string = '';
  tipo: string = '';

  tiposVehiculo: string[] = ['Carro', 'Moto', 'Bicicleta'];

  filtroPlaca: string = '';
  filtroTipo: string = '';
  filtroFechaInicio: Date | null = null;
  filtroFechaFin: Date | null = null;

  displayedColumns: string[] = [
    'placa',
    'tipo',
    'horaIngreso',
    'horaSalida',
    'valorPagado',
    'acciones',
  ];

  private vehiculoService = inject(VehiculoService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  constructor() {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this.vehiculoService.getVehiculos().subscribe((data) => {
      this.vehiculos = data;
      this.vehiculosFiltrados = data;
    });
  }

  registrarVehiculo() {
    if (this.placa && this.tipo) {
      const nuevoVehiculo = {
        placa: this.placa,
        tipo: this.tipo,
        horaIngreso: new Date(),
      };

      this.vehiculoService.registrarVehiculo(nuevoVehiculo).subscribe(() => {
        this.cargarVehiculos();
        this.placa = '';
        this.tipo = '';
      });
    }
  }

  eliminarVehiculo(id: number) {
    this.vehiculoService.eliminarVehiculo(id).subscribe(() => {
      this.cargarVehiculos();
    });
  }

  registrarSalida(vehiculo: any) {
    const dialogRef = this.dialog.open(DialogSalidaComponent, {
      width: '500px',
      height: '300px',
      data: { placa: vehiculo.placa },
    });

    dialogRef.afterClosed().subscribe((numeroFactura) => {
      if (numeroFactura === undefined) {
        console.log('Operación cancelada, no se registró la salida.');
        return;
      }

      this.vehiculoService.calcularSalida(vehiculo.id, numeroFactura).subscribe(
        (response: any) => {
          vehiculo.horaSalida = new Date();
          vehiculo.valorPagado = parseFloat(response.totalPagar.toFixed(2));
        },
        (error) => {
          alert(`Error al registrar salida: ${error.error.mensaje}`);
        }
      );
    });
  }

  filtrarVehiculos() {
    this.vehiculosFiltrados = this.vehiculos.filter((vehiculo) => {
      const coincidePlaca = vehiculo.placa
        .toLowerCase()
        .includes(this.filtroPlaca.toLowerCase());
      const coincideTipo = this.filtroTipo
        ? vehiculo.tipo === this.filtroTipo
        : true;
      const fechaIngreso = new Date(vehiculo.horaIngreso);

      const coincideFechaInicio = this.filtroFechaInicio
        ? fechaIngreso >= this.filtroFechaInicio
        : true;
      const coincideFechaFin = this.filtroFechaFin
        ? fechaIngreso <= this.filtroFechaFin
        : true;

      return (
        coincidePlaca && coincideTipo && coincideFechaInicio && coincideFechaFin
      );
    });
  }

  volverAtras() {
    this.router.navigate(['/main']);
  }
  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
