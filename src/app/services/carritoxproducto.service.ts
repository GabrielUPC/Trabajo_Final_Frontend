import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { CarritoxProducto } from '../models/CarritoxProducto';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class CarritoxproductoService {
  private url= `${base_url}/CarritoProductos`
  listaCambio=new Subject<CarritoxProducto[]>();
  constructor(private http:HttpClient, private loginService:LoginService) { }
  list(){
    const role = this.loginService.getUserRole();
    if(role === 'ADMIN') {
      return this.http.get<CarritoxProducto[]>(this.url);
    }else {
      return this.http.get<CarritoxProducto[]>(`${this.url}/usuario`);
    }
  }
  insert(ca:CarritoxProducto){
    return this.http.post(this.url,ca)
  }
  getlist(){
    return this.listaCambio.asObservable();
  }
  setlist(listaNueva:CarritoxProducto[]){
    return  this.listaCambio.next(listaNueva)
  }
  update(ca:CarritoxProducto){
    return this.http.put(this.url,ca);
  }
  listId(id:number){
    return this.http.get<CarritoxProducto>(`${this.url}/${id}`)
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
