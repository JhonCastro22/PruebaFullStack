import { Component } from '@angular/core';
import { SucursalService } from '../../../services/sucursal.service';
import { Moneda } from '../../../models/moneda';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sucursal } from '../../../models/sucursal';

@Component({
  selector: 'app-sucursal-detalle',
  templateUrl: './sucursal-detalle.component.html',
  styleUrl: './sucursal-detalle.component.css'
})
export class SucursalDetalleComponent {
  monedas: Moneda[] = [];
  registroSucursal:FormGroup;
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';

  constructor(private sucursalService: SucursalService, private fb:FormBuilder) {
this.registroSucursal=fb.group({
  Codigo: ['', Validators.required],
  Descripcion: ['', Validators.required],
  Direccion: ['', Validators.required],
  Identificacion: ['', Validators.required],
  FechaCreacion: ['', Validators.required],
  Moneda: ['', Validators.required]
});
  }
  ngOnInit(){
    this.getMoneda();
  }
  getMoneda() {
    const moneda: Partial<Moneda> = {
      mndEstado: true
    };
    this.sucursalService.getMoneda(moneda).subscribe(data => {
      console.log(data);
      this.monedas = data ?? [];
    });
  }
  guardarSucursal(){
    const fechaCreacion = this.registroSucursal.value.FechaCreacion;
  
    // Convertir la fecha al formato yyyy/MM/dd
    const formattedDate = new Date(fechaCreacion.year, fechaCreacion.month - 1, fechaCreacion.day);

    const Sucursal:Sucursal={
      scrCodigo: this.registroSucursal.value.Codigo,
      scrDescripcion: this.registroSucursal.value.Descripcion,
      scrDireccion: this.registroSucursal.value.Direccion,
      scrIdentificacion: this.registroSucursal.value.Identificacion,
      // scrFechaCreacion: new Date(),
      scrFechaCreacion: formattedDate,
      scrMndId: this.registroSucursal.value.Moneda.mndId,
    }
    console.log(Sucursal);
    this.sucursalService.InsertSucursal(Sucursal).subscribe(data=>{

    });
  }
}
