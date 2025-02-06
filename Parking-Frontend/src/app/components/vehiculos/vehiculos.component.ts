import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculoService } from '../../services/vehiculo.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss'],
})
export class VehiculosComponent {
  vehiculos: any[] = [];
  placa: string = '';
  tipo: string = '';
  displayedColumns: string[] = ['placa', 'tipo', 'horaIngreso', 'acciones'];

  private vehiculoService = inject(VehiculoService);

  constructor() {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this.vehiculoService.getVehiculos().subscribe((data) => {
      this.vehiculos = data;
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
}
