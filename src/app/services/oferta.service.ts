import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Oferta } from '../models/Oferta';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class OfertaService {
  private url= `${base_url}/ofertas`
  listaCambio=new Subject<Oferta[]>()
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Oferta[]>(this.url);
  }
  insert(o:Oferta){
    return this.http.post(this.url,o)
  }
  getlist(){
    return this.listaCambio.asObservable();
  }
  setlist(listaNueva:Oferta[]){
    return this.listaCambio.next(listaNueva);
  }
  update(o:Oferta){
    return this.http.put(this.url,o)
  }
  listId(id:number){
    return this.http.get<Oferta>(`${this.url}/${id}`)
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}