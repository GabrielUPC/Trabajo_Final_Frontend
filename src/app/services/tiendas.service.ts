import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tiendas } from '../models/Tiendas';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private url= `${base_url}/tiendas`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Tiendas[]>(this.url);
  }
}
