import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tiendas } from '../models/Tiendas';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private url= `${base_url}/tiendas`
  private listaCambio = new Subject<Tiendas[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Tiendas[]>(this.url);
  }
  insert(ti:Tiendas){
    return this.http.post<Tiendas>(this.url,ti);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:Tiendas[]){
    return this.listaCambio.next(listaNueva);
  }
}
