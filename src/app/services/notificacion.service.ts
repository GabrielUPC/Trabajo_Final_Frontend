// notificacion.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Notificacion } from '../models/Notificacion';
import { Subject } from 'rxjs';
import { LoginService } from './login.service';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private url = `${base_url}/notificaciones`;
  listaCambio = new Subject<Notificacion[]>();

  constructor(private http: HttpClient, private loginService: LoginService) {}

  list() {
    const role = this.loginService.getUserRole();
    if (role === 'ADMIN') {
      // Si es ADMIN, obtener todas las notificaciones
      return this.http.get<Notificacion[]>(this.url);
    } else {
      // Si es otro rol, obtener solo las notificaciones del usuario
      return this.http.get<Notificacion[]>(`${this.url}/usuario`);
    }
  }

  insert(n: Notificacion) {
    return this.http.post(this.url, n);
  }

  getlist() {
    return this.listaCambio.asObservable();
  }

  setlist(listaNueva: Notificacion[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id:number){
  return this.http.get<Notificacion>(`${this.url}/${id}`)
  }
  update(n: Notificacion) {
    return this.http.put(this.url, n);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

