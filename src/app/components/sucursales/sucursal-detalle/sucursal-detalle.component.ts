import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SucursalService } from '../../../services/sucursal.service';
import { Moneda } from '../../../models/moneda';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sucursal } from '../../../models/sucursal';

@Component({
  selector: 'app-sucursal-detalle',
  templateUrl: './sucursal-detalle.component.html',
  styleUrl: './sucursal-detalle.component.css'
})
export class SucursalDetalleComponent implements OnChanges {
  @Input() sucursal!: Sucursal;
  // @Output() rolGuardado: EventEmitter<void> = new EventEmitter<void>();
  monedas: Moneda[] = [];
  registroSucursal!: FormGroup;
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';

  constructor(private sucursalService: SucursalService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.getMoneda().then(() => {
      this.initFormSucursal();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sucursal'] && changes['sucursal'].currentValue) {
      console.log(this.sucursal);
      this.initFormSucursal(); // Inicializar el formulario cada vez que cambie la sucursal seleccionada
    }
  }

  initFormSucursal(): void {
    // console.log(this.sucursal);
    if (this.sucursal) {
      const fechaCreacion = this.sucursal.scrFechaCreacion
        ? this.convertirFecha(this.sucursal.scrFechaCreacion)
        : null;
      const monedaFiltrada = this.monedas.find(moneda => moneda.mndId === this.sucursal.scrMndId);
      // Inicializa el formulario usando las propiedades de la sucursal seleccionada
      this.registroSucursal = this.fb.group({
        Codigo: [this.sucursal.scrCodigo],
        Descripcion: [this.sucursal.scrDescripcion],
        Direccion: [this.sucursal.scrDireccion],
        Identificacion: [this.sucursal.scrIdentificacion],
        FechaCreacion: [fechaCreacion],
        Moneda: [monedaFiltrada]
      });
    }
  }

  getMoneda(): Promise<void> {
    return new Promise((resolve) => {
      const moneda: Partial<Moneda> = { mndEstado: true };

      this.sucursalService.getMoneda(moneda).subscribe(data => {
        this.monedas = data ?? [];
        resolve(); // Llama a resolve una vez que las monedas están cargadas
      });
    });
  }

  guardarSucursal() {
    const fechaCreacion = this.registroSucursal.value.FechaCreacion;

    // Asegurarse de que formateas la fecha correctamente
    const formattedDate = new Date(fechaCreacion.year, fechaCreacion.month - 1, fechaCreacion.day);

    // Extraer solo el mndId de la moneda seleccionada
    const monedaSeleccionada = this.registroSucursal.get('Moneda')?.value;
    const sucursalSave: Sucursal = {
      scrCodigo: this.registroSucursal.get('Codigo')?.value,
      scrDescripcion: this.registroSucursal.get('Descripcion')?.value,
      scrDireccion: this.registroSucursal.get('Direccion')?.value,
      scrIdentificacion: this.registroSucursal.get('Identificacion')?.value,
      scrFechaCreacion: formattedDate,
      scrMndId: monedaSeleccionada ? monedaSeleccionada.mndId : null // Extraer el ID de la moneda seleccionada
    };
    console.log(sucursalSave)
    this.sucursalService.InsertSucursal(sucursalSave).subscribe(data => {
      console.log('Sucursal Guardada con éxito');
    });
  }
  convertirFecha(fecha: string | Date): { year: number, month: number, day: number } {
    const date = new Date(fecha);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1, // Los meses empiezan en 0 en JavaScript, por eso se suma 1
      day: date.getDate()
    };
  }
  editarSucursal(){
      const fechaCreacion = this.registroSucursal.value.FechaCreacion;
  
      // Asegurarse de que formateas la fecha correctamente
      const formattedDate = new Date(fechaCreacion.year, fechaCreacion.month - 1, fechaCreacion.day);
  
      // Extraer solo el mndId de la moneda seleccionada
      const monedaSeleccionada = this.registroSucursal.get('Moneda')?.value;
      const sucursalSave: Sucursal = {
        scrCodigo: this.registroSucursal.get('Codigo')?.value,
        scrDescripcion: this.registroSucursal.get('Descripcion')?.value,
        scrDireccion: this.registroSucursal.get('Direccion')?.value,
        scrIdentificacion: this.registroSucursal.get('Identificacion')?.value,
        scrFechaCreacion: formattedDate,
        scrMndId: monedaSeleccionada ? monedaSeleccionada.mndId : null // Extraer el ID de la moneda seleccionada
      };
      console.log(sucursalSave)
      this.sucursalService.UpdateSucursal(sucursalSave).subscribe(data => {
        console.log('Sucursal Guardada con éxito');
      });
    
  }

}
