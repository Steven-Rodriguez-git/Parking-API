import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-salida',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-salida.component.html',
  styleUrls: ['./dialog-salida.component.scss'],
})
export class DialogSalidaComponent {
  numeroFactura: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogSalidaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirmarSalida() {
    this.dialogRef.close(this.numeroFactura || null);
  }

  cancelar() {
    this.dialogRef.close(undefined);
  }
}
