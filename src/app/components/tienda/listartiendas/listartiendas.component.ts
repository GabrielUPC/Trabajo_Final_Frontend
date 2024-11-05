import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tienda } from '../../../models/Tienda';
import { TiendaService } from '../../../services/tienda.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-listartiendas',
  standalone: true,
  imports: [MatTableModule, RouterLink,MatIconModule,MatButtonModule],
  templateUrl: './listartiendas.component.html',
  styleUrl: './listartiendas.component.css',
})
export class ListartiendasComponent implements OnInit {
  dataSource: MatTableDataSource<Tienda> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','accion1','accion2'];
  constructor(private tS: TiendaService) {}
  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.tS.getlist().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }
  eliminar(id:number){
    this.tS.delete(id).subscribe(data=>{
      this.tS.list().subscribe(data=>{
        this.tS.setlist(data)
      })
    })
  }
}
