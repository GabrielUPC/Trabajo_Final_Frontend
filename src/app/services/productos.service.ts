import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Productos } from '../models/Productos';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductosMasVendidos } from '../models/ProductosMasVendidos';
import { ProductosMenorStock } from '../models/ProductosMenorStock';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url= `${base_url}/productos`
  listaCambio=new Subject<Productos[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Productos[]>(this.url);
  }
  insert(pr:Productos){
    return this.http.post(this.url,pr)
  }
  getlist(){
    return this.listaCambio.asObservable();
  }
  setlist(listaNueva:Productos[]){
    return  this.listaCambio.next(listaNueva)
  }
  update(pr:Productos){
    return this.http.put(this.url,pr);
  }
  listId(id:number){
    return this.http.get<Productos>(`${this.url}/${id}`)
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  getProductosV():Observable<ProductosMasVendidos[]>{
    return this.http.get<ProductosMasVendidos[]>(`${this.url}/productosmasvendidos`)
  }
  getProductosM():Observable<ProductosMenorStock[]>{
    return this.http.get<ProductosMenorStock[]>(`${this.url}/productosmenorstock`)
  }
}
