import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Carrito } from '../../../models/Carrito';
import { CarritoService } from '../../../services/carrito.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarcarritos',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatButtonModule,MatPaginatorModule],
  templateUrl: './listarcarritos.component.html',
  styleUrl: './listarcarritos.component.css'
})
export class ListarcarritosComponent implements OnInit {
  dataSource:MatTableDataSource<Carrito>=new MatTableDataSource();
  displayedColumns:string[]=['c1','accion1']
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(private cS:CarritoService){}
  ngOnInit(): void {
    this.cS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getlist().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  eliminar(id:number){
    this.cS.delete(id).subscribe(data=>{
      this.cS.list().subscribe(data=>{
        this.cS.setlist(data)
      })
    })
  }
}
