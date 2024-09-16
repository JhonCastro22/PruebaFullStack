import { Injectable } from '@angular/core';
import { Sucursal } from '../models/sucursal';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Moneda } from '../models/moneda';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  myAppUrl:string;
  myApiUrl:string;
  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:5283';
      this.myApiUrl = '/api/Sucursal';
   }
   GetSucursal(Sucursal:Sucursal):Observable<Sucursal>{
    return this.http.put<Sucursal>(this.myAppUrl+this.myApiUrl+'/GetSucursal',Sucursal);
   }
   GetListaSucursals(Sucursal:Sucursal):Observable<Sucursal[]>{
    return this.http.get<Sucursal[]>(this.myAppUrl+this.myApiUrl+'/GetSucursales');
   }
   InsertSucursal(Sucursal:Sucursal):Observable<any>{
    return this.http.post<Sucursal[]>(this.myAppUrl+this.myApiUrl+'/InsertSucursal',Sucursal);
   }
   UpdateSucursal(Sucursal:Sucursal):Observable<any>{
    return this.http.put<Sucursal[]>(this.myAppUrl+this.myApiUrl+'/UpdateSucursal',Sucursal);
   }
   getMoneda(Moneda:Moneda): Observable<Moneda[]> {
    return this.http.put<Moneda[]>(this.myAppUrl + this.myApiUrl + '/GetMoneda',Moneda);
  }
}
