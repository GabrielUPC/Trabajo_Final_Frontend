import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Productos } from '../../../models/Productos';
import { ProductoService } from '../../../services/productos.service';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listaproductos',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, MatButtonModule,CommonModule,MatPaginatorModule],
  templateUrl: './listaproductos.component.html',
  styleUrls: ['./listaproductos.component.css']
})
export class ListaproductosComponent implements OnInit {
  dataSource: MatTableDataSource<Productos> = new MatTableDataSource();
  displayedColumns: string[] = [
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'
  ];
  role: string = '';
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(private ps: ProductoService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.ps.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.ps.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    // Obtén el rol del usuario y ajusta las columnas visibles
    const userInfo = this.loginService.showRole();
    if (userInfo) {
      this.role = userInfo.role || '';
      if (this.isAdmin() || this.isVendedor()) {
        this.displayedColumns.push('accion1', 'accion2');
      }
    }
  }

  eliminar(id: number) {
    this.ps.delete(id).subscribe(() => {
      this.ps.list().subscribe((data) => {
        this.ps.setlist(data);
      });
    });
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }

  isVendedor() {
    return this.role === 'VENDEDOR';
  }
}
