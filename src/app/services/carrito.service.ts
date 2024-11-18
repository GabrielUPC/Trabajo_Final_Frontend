import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrito } from '../models/Carrito';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
<<<<<<< HEAD
=======
import { LoginService } from './login.service';
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private url= `${base_url}/carritos`
<<<<<<< HEAD
  private listaCambio=new Subject<Carrito[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Carrito[]>(this.url);
=======
  listaCambio=new Subject<Carrito[]>();
  constructor(private http:HttpClient, private loginService: LoginService) { }
  list(){
    const role = this.loginService.getUserRole();
    if(role === 'ADMIN') {
      return this.http.get<Carrito[]>(this.url);
    }else {
      return this.http.get<Carrito[]>(`${this.url}/usuario`);
    }
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
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
