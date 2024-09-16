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
  constructor(private sucursalService: SucursalService, config: NgbNavConfig,private fb: FormBuilder) {
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
    this.GetSucursales();
  }
  GetSucursales() {
    const partialSucursal: Partial<Sucursal> = {
    }
    this.sucursalService.GetListaSucursals(partialSucursal).subscribe(data => {
      this.sucursales = data ?? [];
    });
  }
  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
