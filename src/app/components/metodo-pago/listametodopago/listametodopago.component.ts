import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MetodoPago } from '../../../models/MetodoPago';
import { MetodopagoService } from '../../../services/metodopago.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listametodopago',
  standalone: true,
  imports: [MatTableModule,RouterLink,MatIconModule,MatButtonModule,MatPaginatorModule],
  templateUrl: './listametodopago.component.html',
  styleUrl: './listametodopago.component.css'
})
export class ListametodopagoComponent implements OnInit{
  dataSource:MatTableDataSource<MetodoPago>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','c4','accion1','accion2']
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(private ms:MetodopagoService){}
  ngOnInit(): void {
    this.ms.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });  
    this.ms.getlist().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }
  eliminar(id:number){
    this.ms.delete(id).subscribe(data=>{
      this.ms.list().subscribe(data=>{
        this.ms.setlist(data)
      })
    })
  }
  
}
