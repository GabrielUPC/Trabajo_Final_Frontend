import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Productos } from '../../../models/Productos';
import { ProductoService } from '../../../services/productos.service';

@Component({
  selector: 'app-listaproductos',
  standalone: true,
  imports:[MatTableModule,MatIconModule,RouterLink,MatButtonModule],
  templateUrl: './listaproductos.component.html',
  styleUrl: './listaproductos.component.css'
})
export class ListaproductosComponent implements OnInit{
  dataSource:MatTableDataSource<Productos>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','accion1','accion2']
  constructor(private ps:ProductoService){}
  ngOnInit(): void {
    this.ps.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
    this.ps.getlist().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }
  eliminar(id:number){
    this.ps.delete(id).subscribe((data)=>{
      this.ps.list().subscribe((data)=>{
        this.ps.setlist(data)
      });
    });
  }
}
