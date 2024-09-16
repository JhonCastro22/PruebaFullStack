import { Component, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { SucursalService } from '../../services/sucursal.service';
import { Sucursal } from '../../models/sucursal';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.css'
})
export class SucursalesComponent {
  private modalService = inject(NgbModal);
  registroSucursal: FormGroup;
  closeResult = '';
  sucursales: Sucursal[] = [];
  sucursalSeleccionada!: Sucursal;
  sidebarVisible: boolean = false;
  constructor(private sucursalService: SucursalService, config: NgbNavConfig, private fb: FormBuilder) {
    this.registroSucursal = this.fb.group({
      Codigo: [''],
      Descripcion: [''],
      Direccion: [''],
      Identificacion: [''],
      Moneda: [''],
      FechaCreacion: ['']
    });
  }
  ngOnInit() {
    this.sucursalSeleccionada = new Sucursal;
    this.GetSucursales();
  }
  GetSucursales() {
    const partialSucursal: Partial<Sucursal> = {
    }
    this.sucursalService.GetListaSucursals(partialSucursal).subscribe(data => {
      this.sucursales = data ?? [];
    });
  }
  onRolGuardado(): void {
    this.sidebarVisible = false;
    this.GetSucursales();
  }
  detailRol(item?: Sucursal) {
    if (item) {
      this.sidebarVisible = true;
      this.sucursalSeleccionada = item;
    } else {
      this.sucursalSeleccionada = new Sucursal();
      this.sidebarVisible = true;
    }
  }

}
