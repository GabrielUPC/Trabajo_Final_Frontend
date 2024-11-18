import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Roles } from '../models/Roles';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url= `${base_url}/roles`
  listaCambio=new Subject<Roles[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Roles[]>(this.url);
  }
  insert(r:Roles){
    return this.http.post(this.url,r)
  }
  getlist(){
    return this.listaCambio.asObservable();
  }
  setlist(listaNueva:Roles[]){
    return  this.listaCambio.next(listaNueva)
  }
  update(rv:Roles){
    return this.http.put(this.url,rv);
  }
  listId(id:number){
    return this.http.get<Roles>(`${this.url}/${id}`)
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
