import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ServicioCliente } from '../../../models/ServicioCliente';
import { ServicioclienteService } from '../../../services/serviciocliente.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarserviciosclientes',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,MatButtonModule,CommonModule],
  templateUrl: './listarserviciosclientes.component.html',
  styleUrl: './listarserviciosclientes.component.css'
})
export class ListarserviciosclientesComponent implements OnInit{
  dataSource:MatTableDataSource<ServicioCliente>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','c4','c5','accion1','accion2']
  constructor(private sc:ServicioclienteService){}
  ngOnInit(): void {
    this.sc.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.sc.getlist().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  eliminar(id:number){
    this.sc.delete(id).subscribe(data=>{
      this.sc.list().subscribe(data=>{
        this.sc.setlist(data)
      })
    })
  }
}
