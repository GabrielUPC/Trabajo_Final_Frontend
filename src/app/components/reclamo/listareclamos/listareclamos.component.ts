import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Reclamo } from '../../../models/Reclamo';
import { ReclamoService } from '../../../services/reclamo.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listareclamos',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule],
  templateUrl: './listareclamos.component.html',
  styleUrl: './listareclamos.component.css'
})
export class ListareclamosComponent implements OnInit {
  dataSource:MatTableDataSource<Reclamo>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','c4','accion1','accion2']
  constructor(private rs:ReclamoService){}
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
