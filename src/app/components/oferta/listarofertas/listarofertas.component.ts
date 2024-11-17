import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Oferta } from '../../../models/Oferta';
import { OfertaService } from '../../../services/oferta.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-listarofertas',
  standalone: true,
  imports: [MatTableModule,RouterLink,MatIconModule,MatButtonModule,CommonModule,MatPaginatorModule],
  templateUrl: './listarofertas.component.html',
  styleUrl: './listarofertas.component.css'
})
export class ListarofertasComponent implements OnInit {
  dataSource:MatTableDataSource<Oferta>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','c4','c5']
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  role: string = '';
  constructor(private oS:OfertaService, private loginService: LoginService){}
  ngOnInit(): void {
  
    this.oS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    const userInfo = this.loginService.showRole();
    if (userInfo) {
      this.role = userInfo.role || '';

      if (this.isAdmin()||this.isVendedor()) {
        this.displayedColumns.push('accion1', 'accion2'); // Agregar columnas adicionales para ADMIN
      } 
    }

    
    this.oS.getlist().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }
  
  eliminar(id:number){
    this.oS.delete(id).subscribe(data=>{
      this.oS.list().subscribe(data=>{
        this.oS.setlist(data)
      })
    })
  }
  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }
  isVendedor(): boolean {
    return this.role === 'VENDEDOR';
  }
  
}
