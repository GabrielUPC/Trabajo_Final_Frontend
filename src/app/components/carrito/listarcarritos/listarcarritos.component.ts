<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
=======
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
import { Carrito } from '../../../models/Carrito';
import { CarritoService } from '../../../services/carrito.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
<<<<<<< HEAD
=======
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31

@Component({
  selector: 'app-listarcarritos',
  standalone: true,
<<<<<<< HEAD
  imports: [MatTableModule,RouterLink,MatIconModule,MatButtonModule],
=======
  imports: [MatTableModule,MatIconModule,MatButtonModule,MatPaginatorModule],
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
  templateUrl: './listarcarritos.component.html',
  styleUrl: './listarcarritos.component.css'
})
export class ListarcarritosComponent implements OnInit {
  dataSource:MatTableDataSource<Carrito>=new MatTableDataSource();
<<<<<<< HEAD
  displayedColumns:string[]=['c1','c2','accion1','accion2']
=======
  displayedColumns:string[]=['c1','accion1']
  @ViewChild(MatPaginator) paginator!:MatPaginator;
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
  constructor(private cS:CarritoService){}
  ngOnInit(): void {
    this.cS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
<<<<<<< HEAD
=======
      this.dataSource.paginator = this.paginator;
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
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
