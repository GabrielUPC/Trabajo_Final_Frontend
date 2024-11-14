import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CarritoxProducto } from '../../../models/CarritoxProducto';
import { CarritoxproductoService } from '../../../services/carritoxproducto.service';

@Component({
  selector: 'app-listacarritoxproducto',
  standalone: true,
  imports: [MatTableModule,RouterLink,MatIconModule,MatButtonModule],
  templateUrl: './listacarritoxproducto.component.html',
  styleUrl: './listacarritoxproducto.component.css'
})
export class ListacarritoxproductoComponent implements OnInit{
  dataSource:MatTableDataSource<CarritoxProducto>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','c4','accion1','accion2']
  constructor(private cps:CarritoxproductoService){}
  ngOnInit(): void {
    this.cps.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });  
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
}
