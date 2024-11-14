import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Review } from '../../../models/Review';
import { ReviewService } from '../../../services/review.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listareviews',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,MatButtonModule,CommonModule],
  templateUrl: './listareviews.component.html',
  styleUrl: './listareviews.component.css'
})
export class ListareviewsComponent implements OnInit{
  dataSource:MatTableDataSource<Review>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','c4','c5','accion1','accion2']
  constructor(private rs:ReviewService){}
  ngOnInit(): void {
    this.rs.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
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
}
