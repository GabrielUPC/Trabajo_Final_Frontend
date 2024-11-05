import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tienda } from '../models/Tienda';
import { Subject } from 'rxjs';
import { Usuario } from '../models/Usuario';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private url=`${base_url}/tiendas`
  private listacambio=new Subject<Tienda[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Tienda[]>(this.url);
  }
  insert(t:Tienda){
    return this.http.post(this.url,t) 
  }
  getlist(){
    return this.listacambio.asObservable();
  }
  setlist(listanueva:Tienda[]){
    return this.listacambio.next(listanueva);
  }
  update(t:Tienda){
    return this.http.put(this.url,t);
  }
  listid(id:number){
    return this.http.get<Tienda>(`${this.url}/${id}`);
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
