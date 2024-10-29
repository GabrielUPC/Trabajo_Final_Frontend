import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Oferta } from '../models/Oferta';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class OfertaService {
  private url= `${base_url}/ofertas`

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Oferta[]>(this.url);

  }
}
