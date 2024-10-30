import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrito } from '../models/Carrito';
import { environment } from '../../environments/environment';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
private url= `${base_url}/Carrito`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Carrito[]>(this.url);
  }
}
