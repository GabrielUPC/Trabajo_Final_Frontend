import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Carrito } from '../../../models/Carrito';
import { CarritoService } from '../../../services/carrito.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarcarritos',
  standalone: true,
  imports: [MatTableModule,RouterLink,MatIconModule,MatButtonModule],
  templateUrl: './listarcarritos.component.html',
  styleUrl: './listarcarritos.component.css'
})
export class ListarcarritosComponent implements OnInit {
  dataSource:MatTableDataSource<Carrito>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','c4','accion1','accion2']
  constructor(private cS:CarritoService){}
  ngOnInit(): void {
    this.cS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
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
