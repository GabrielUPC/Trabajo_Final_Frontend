import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrito } from '../models/Carrito';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Oferta } from '../models/Oferta';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private url= `${base_url}/carritos`
  private listaCambio=new Subject<Carrito[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Carrito[]>(this.url);
  }
  insert(c:Carrito){
    return this.http.post(this.url,c)
  }
  getlist(){
    return this.listaCambio.asObservable();
  }
  setlist(listaNueva:Carrito[]){
    return  this.listaCambio.next(listaNueva)
  }
  update(c:Carrito){
    return this.http.put(this.url,c);
  }
  listId(id:number){
    return this.http.get<Carrito>(`${this.url}/${id}`)
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
