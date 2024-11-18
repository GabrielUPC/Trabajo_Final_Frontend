<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit, ViewChild } from '@angular/core';
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Review } from '../../../models/Review';
import { ReviewService } from '../../../services/review.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
=======
import { LoginService } from '../../../services/login.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31

@Component({
  selector: 'app-listareviews',
  standalone: true,
<<<<<<< HEAD
  imports: [MatTableModule,MatIconModule,RouterModule,MatButtonModule,CommonModule],
=======
  imports: [MatTableModule,MatIconModule,RouterModule,MatButtonModule,CommonModule,MatPaginatorModule],
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
  templateUrl: './listareviews.component.html',
  styleUrl: './listareviews.component.css'
})
export class ListareviewsComponent implements OnInit{
  dataSource:MatTableDataSource<Review>=new MatTableDataSource();
<<<<<<< HEAD
  displayedColumns:string[]=['c1','c2','c3','c4','c5','accion1','accion2']
  constructor(private rs:ReviewService){}
  ngOnInit(): void {
    this.rs.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
=======
  displayedColumns:string[]=['c1','c2','c3','c4','c5']
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  role: string = '';
  constructor(private rs:ReviewService, private loginService: LoginService){}
  ngOnInit(): void {
    this.rs.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    const userInfo = this.loginService.showRole();
    if (userInfo) {
      this.role = userInfo.role || '';

      if (this.isAdmin()||this.isComprador()) {
        this.displayedColumns.push('accion1','accion2'); // Agregar columnas adicionales para ADMIN
      } 
      
    }
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
    this.rs.getlist().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }
  eliminar(id:number){
    this.rs.delete(id).subscribe((data)=>{
      this.rs.list().subscribe((data)=>{
        this.rs.setlist(data)
      });
    });
  }
<<<<<<< HEAD
=======
  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }
  isComprador(): boolean {
    return this.role === 'COMPRADOR';
  }
>>>>>>> 3e03ab6fa86a5928141ba6e2078eb3f8da6c3e31
}
