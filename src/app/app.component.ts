import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[
    RouterOutlet,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TRABAJO_FINAl';
  role: string = '';
  userName:string='';
  constructor(private loginService: LoginService) {}
  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    const userInfo = this.loginService.showRole();
    if (userInfo) {
      this.role = userInfo.role || '';
      this.userName = userInfo.name || '';
    }
    return this.loginService.verificar();
  }
  isVendedor() {
    return this.role === 'VENDEDOR';
  }
  isAdmin() {
    return this.role === 'ADMIN';
  }

  isComprador() {
    return this.role === 'COMPRADOR';
  }
}
