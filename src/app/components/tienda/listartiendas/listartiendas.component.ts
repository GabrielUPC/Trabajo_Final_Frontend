import { Component, OnInit } from '@angular/core';
import{MatTableDataSource, MatTableModule} from '@angular/material/table'
import { Tiendas } from '../../../models/Tiendas';
import { TiendaService } from '../../../services/tiendas.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-listartiendas',
  standalone: true,
  imports: [MatTableModule,RouterLink],
  templateUrl: './listartiendas.component.html',
  styleUrl: './listartiendas.component.css'
})
export class ListartiendasComponent implements OnInit {
  dataSource:MatTableDataSource<Tiendas>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','c4']
  constructor(private tS:TiendaService){}
  ngOnInit(): void {
    this.tS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
  }
}
