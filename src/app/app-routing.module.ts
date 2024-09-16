import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';

const routes: Routes = [
  {path:'',redirectTo:'/inicio',pathMatch:'full'},
{path:'inicio', component:InicioComponent},
{path:'sucursales',component:SucursalesComponent},
{path:'*',redirectTo:'/inicio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
