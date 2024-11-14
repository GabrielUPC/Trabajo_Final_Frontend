import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ServicioCliente } from '../models/ServicioCliente';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ServicioclienteService {
  private url= `${base_url}/servicios`
  listaCambio=new Subject<ServicioCliente[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<ServicioCliente[]>(this.url);
  }
  insert(sc:ServicioCliente){
    return this.http.post(this.url,sc)
  }
  getlist(){
    return this.listaCambio.asObservable();
  }
  setlist(listaNueva:ServicioCliente[]){
    return  this.listaCambio.next(listaNueva)
  }
  update(sc:ServicioCliente){
    return this.http.put(this.url,sc);
  }
  listId(id:number){
    return this.http.get<ServicioCliente>(`${this.url}/${id}`)
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
