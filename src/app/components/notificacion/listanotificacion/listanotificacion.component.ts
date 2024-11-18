import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Notificacion } from '../../../models/Notificacion';
import { NotificacionService } from '../../../services/notificacion.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listanotificacion',
  standalone: true,
  imports: [MatTableModule, RouterLink, MatIconModule, MatButtonModule,CommonModule,MatPaginatorModule],
  templateUrl: './listanotificacion.component.html',
  styleUrl: './listanotificacion.component.css',
})
export class ListanotificacionComponent implements OnInit {
  dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  role: string = '';
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(private ns: NotificacionService, private loginService: LoginService) {}
  ngOnInit(): void {
    this.ns.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    const userInfo = this.loginService.showRole();
    if (userInfo) {
      this.role = userInfo.role || '';

      if (this.isAdmin()) {
        this.displayedColumns.push('accion1', 'accion2'); // Agregar columnas adicionales para ADMIN
      } 
    }
    this.ns.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.ns.delete(id).subscribe((data) => {
      this.ns.list().subscribe((data) => {
        this.ns.setlist(data);
      });
    });
  }
  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }
}
