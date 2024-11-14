import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Review } from '../models/Review';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private url= `${base_url}/reviews`
  listaCambio=new Subject<Review[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Review[]>(this.url);
  }
  insert(rv:Review){
    return this.http.post(this.url,rv)
  }
  getlist(){
    return this.listaCambio.asObservable();
  }
  setlist(listaNueva:Review[]){
    return  this.listaCambio.next(listaNueva)
  }
  update(rv:Review){
    return this.http.put(this.url,rv);
  }
  listId(id:number){
    return this.http.get<Review>(`${this.url}/${id}`)
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
