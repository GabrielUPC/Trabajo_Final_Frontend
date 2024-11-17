import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
    return this.http.post<any>(`${this.baseUrl}/login`, request).pipe(
      tap(response => {
        // Almacena el token y el id del usuario en el sessionStorage
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('usuarioId', response.userId); // Ajusta esto según el campo que recibas
      })
    );
  }

  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  } 

  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return null; 
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);

    // Retornamos el nombre y el rol del usuario
    const role = decodedToken?.role;
    const name = decodedToken?.nombre;
    const id = decodedToken?.id;
    return { role, name,id };
  }

  // Método para obtener el usuarioId almacenado
  getUsuarioId() {
    return parseInt(sessionStorage.getItem('usuarioId') || '0', 10);
  }
  // Método para obtener el rol almacenado
  getUserRole() {
    const userInfo = this.showRole();
    return userInfo ? userInfo.role : null;
  }
  
}
