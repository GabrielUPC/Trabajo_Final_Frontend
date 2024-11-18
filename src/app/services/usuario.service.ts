import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url= `${base_url}/usuarios`
  private listaCambio=new Subject<Usuario[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Usuario[]>(this.url);
  }
  insert(us:Usuario){
    return this.http.post(this.url,us)
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:Usuario[]){
    return this.listaCambio.next(listaNueva)
  }
  update(u:Usuario){
    return this.http.put(this.url,u);
  }
  listId(id:number){
    return this.http.get<Usuario>(`${this.url}/${id}`)
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
