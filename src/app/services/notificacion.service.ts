import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Notificacion } from '../models/Notificacion';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private url= `${base_url}/notificaciones`
  listaCambio=new Subject<Notificacion[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Notificacion[]>(this.url);
  }
  insert(n:Notificacion){
    return this.http.post(this.url,n)
  }
  getlist(){
    return this.listaCambio.asObservable();
  }
  setlist(listaNueva:Notificacion[]){
    return this.listaCambio.next(listaNueva)
  }
  update(n:Notificacion){
    return this.http.put(this.url,n);
  }
  listId(id:number){
    return this.http.get<Notificacion>(`${this.url}/${id}`)
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
