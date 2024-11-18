import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Pedido } from '../models/Pedido';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { MontoPedido } from '../models/MontoPedido';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private url= `${base_url}/pedidos`
  listaCambio=new Subject<Pedido[]>();
  constructor(private http:HttpClient, private loginService: LoginService) { }
  list(){
    const role = this.loginService.getUserRole();
    if (role === 'ADMIN') {
      return this.http.get<Pedido[]>(this.url);
    } else if(role==='COMPRADOR'){
      return this.http.get<Pedido[]>(`${this.url}/usuario`);
    }else{
      return this.http.get<Pedido[]>(`${this.url}/vendedor`);
    }
  }
  insert(pe:Pedido){
    return this.http.post(this.url,pe)
  }
  getlist(){
    return this.listaCambio.asObservable();
  }
  setlist(listaNueva:Pedido[]){
    return  this.listaCambio.next(listaNueva)
  }
  update(pe:Pedido){
    return this.http.put(this.url,pe);
  }
  listId(id:number){
    return this.http.get<Pedido>(`${this.url}/${id}`)
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  getMontosPedidos():Observable<MontoPedido[]>{
    return this.http.get<MontoPedido[]>(`${this.url}/montopedido`)
  }
}
