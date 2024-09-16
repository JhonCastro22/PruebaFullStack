import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import { SucursalDetalleComponent } from './components/sucursales/sucursal-detalle/sucursal-detalle.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SucursalService } from './services/sucursal.service';
import { TableModule } from 'primeng/table';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SucursalesComponent,
    SucursalDetalleComponent,
    InicioComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    TableModule,
    DropdownModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [SucursalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
