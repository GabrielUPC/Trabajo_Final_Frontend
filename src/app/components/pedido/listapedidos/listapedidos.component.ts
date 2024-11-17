import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pedido } from '../../../models/Pedido';
import { PedidoService } from '../../../services/pedido.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listapedidos',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink, MatButtonModule, CommonModule,MatPaginatorModule],
  templateUrl: './listapedidos.component.html',
  styleUrls: ['./listapedidos.component.css']
})
export class ListapedidosComponent implements OnInit {
  dataSource: MatTableDataSource<Pedido> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4']; // Columnas base
  role: string = '';
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(private ps: PedidoService, private loginService: LoginService) {}

  ngOnInit(): void {
 
    this.loadPedidos();

    const userInfo = this.loginService.showRole();
    if (userInfo) {
      this.role = userInfo.role || '';

      if (this.isAdmin()) {
        this.displayedColumns.push('c5', 'accion1', 'accion2'); 
      } 
    }
    this.ps.getlist().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }

  loadPedidos(): void {
    this.ps.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number): void {
    this.ps.delete(id).subscribe(() => {
      this.loadPedidos(); // Recargar la lista después de eliminar
    });
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

 
}
