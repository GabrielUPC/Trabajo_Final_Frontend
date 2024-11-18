import { Component, OnInit, ViewChild } from '@angular/core';
import { Roles } from '../../../models/Roles';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RolesService } from '../../../services/roles.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listaroles',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,MatButtonModule,CommonModule,MatPaginatorModule],
  templateUrl: './listaroles.component.html',
  styleUrl: './listaroles.component.css'
})
export class ListarolesComponent implements OnInit{
  dataSource:MatTableDataSource<Roles>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','accion1','accion2']
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(private rs:RolesService){}
  ngOnInit(): void {
    this.rs.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.rs.getlist().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  eliminar(id:number){
    this.rs.delete(id).subscribe(data=>{
      this.rs.list().subscribe(data=>{
        this.rs.setlist(data)
      })
    })
  }
}
