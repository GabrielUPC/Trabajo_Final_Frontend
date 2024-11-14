import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MetodoPago } from '../models/MetodoPago';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class MetodopagoService {

  private url= `${base_url}/metodopagos`
  listaCambio=new Subject<MetodoPago[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<MetodoPago[]>(this.url);
  }
  insert(mp:MetodoPago){
    return this.http.post(this.url,mp)
  }
  getlist(){
    return this.listaCambio.asObservable();
  }
  setlist(listaNueva:MetodoPago[]){
    return  this.listaCambio.next(listaNueva)
  }
  update(mp:MetodoPago){
    return this.http.put(this.url,mp);
  }
  listId(id:number){
    return this.http.get<MetodoPago>(`${this.url}/${id}`)
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
