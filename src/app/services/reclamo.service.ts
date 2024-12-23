import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Reclamo } from '../models/Reclamo';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ReclamoService {
  private url= `${base_url}/reclamos`
  listaCambio=new Subject<Reclamo[]>();
  constructor(private http:HttpClient, private loginService: LoginService) { }
  list() {
    const role = this.loginService.getUserRole();
    if (role === 'ADMIN') {
      return this.http.get<Reclamo[]>(this.url);
    } else if(role==='COMPRADOR'){
      return this.http.get<Reclamo[]>(`${this.url}/usuario`);
    }else{
      return this.http.get<Reclamo[]>(`${this.url}/vendedor`);
    }
  }
  insert(re:Reclamo){
    return this.http.post(this.url,re)
  }
  getlist(){
    return this.listaCambio.asObservable();
  }
  setlist(listaNueva:Reclamo[]){
    return  this.listaCambio.next(listaNueva)
  }
  update(re:Reclamo){
    return this.http.put(this.url,re);
  }
  listId(id:number){
    return this.http.get<Reclamo>(`${this.url}/${id}`)
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
