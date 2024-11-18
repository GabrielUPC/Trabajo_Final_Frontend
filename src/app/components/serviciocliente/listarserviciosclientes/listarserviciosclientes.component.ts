import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ServicioCliente } from '../../../models/ServicioCliente';
import { ServicioclienteService } from '../../../services/serviciocliente.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarserviciosclientes',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatButtonModule, CommonModule,MatPaginatorModule],
  templateUrl: './listarserviciosclientes.component.html',
  styleUrls: ['./listarserviciosclientes.component.css']
})
export class ListarserviciosclientesComponent implements OnInit {
  dataSource: MatTableDataSource<ServicioCliente> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4']; // Columnas base
  role: string = '';
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(private sc: ServicioclienteService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loadservicios();

    const userInfo = this.loginService.showRole();
    if (userInfo) {
      this.role = userInfo.role || '';

      if (this.isAdmin()) {
        this.displayedColumns.push('c5', 'accion1', 'accion2'); // Agregar columnas adicionales para ADMIN
      } 
    }

    this.sc.getlist().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  loadservicios(): void {
    this.sc.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number): void {
    this.sc.delete(id).subscribe(() => {
      this.loadservicios(); // Recargar la lista después de eliminar
    });
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

}
