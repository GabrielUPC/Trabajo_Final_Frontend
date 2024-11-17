import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Reclamo } from '../../../models/Reclamo';
import { ReclamoService } from '../../../services/reclamo.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../../services/login.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listareclamos',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule,MatPaginatorModule],
  templateUrl: './listareclamos.component.html',
  styleUrl: './listareclamos.component.css'
})
export class ListareclamosComponent implements OnInit {
  dataSource:MatTableDataSource<Reclamo>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3']
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  role: string = '';
  constructor(private rs:ReclamoService, private loginService: LoginService){}
  ngOnInit(): void {
    this.loadservicios();

    const userInfo = this.loginService.showRole();
    if (userInfo) {
      this.role = userInfo.role || '';

      if (this.isAdmin()) {
        this.displayedColumns.push('c4', 'accion1', 'accion2'); // Agregar columnas adicionales para ADMIN
      } 
    }
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
  loadservicios(): void {
    this.rs.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }
}
