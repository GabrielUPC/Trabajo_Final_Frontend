import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CarritoxProducto } from '../../../models/CarritoxProducto';
import { CarritoxproductoService } from '../../../services/carritoxproducto.service';
import { LoginService } from '../../../services/login.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listacarritoxproducto',
  standalone: true,
  imports: [MatTableModule,RouterLink,MatIconModule,MatButtonModule,MatPaginatorModule],
  templateUrl: './listacarritoxproducto.component.html',
  styleUrl: './listacarritoxproducto.component.css'
})
export class ListacarritoxproductoComponent implements OnInit{
  dataSource:MatTableDataSource<CarritoxProducto>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','accion1','accion2']
  role: string = '';
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(private cps:CarritoxproductoService, private loginService: LoginService){}
  ngOnInit(): void {
    this.cps.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });  
    const userInfo = this.loginService.showRole();
    if (userInfo) {
      this.role = userInfo.role || '';

      if (this.isAdmin()) {
        this.displayedColumns.push('c3', 'c4'); // Agregar columnas adicionales para ADMIN
      } 
    }
    this.cps.getlist().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }
  eliminar(id:number){
    this.cps.delete(id).subscribe(data=>{
      this.cps.list().subscribe(data=>{
        this.cps.setlist(data)
      })
    })
  }
  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }
}
