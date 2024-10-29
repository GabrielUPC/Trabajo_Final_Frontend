import { Component, OnInit } from '@angular/core';
import{MatTableDataSource, MatTableModule} from '@angular/material/table'
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-listarusuarios',
  standalone: true,
  imports: [MatTableModule,RouterLink],
  templateUrl: './listarusuarios.component.html',
  styleUrl: './listarusuarios.component.css'
})
export class ListarusuariosComponent implements OnInit {
  dataSource:MatTableDataSource<Usuario>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7']
  constructor(private uS:UsuarioService){}
  ngOnInit(): void {
    this.uS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
  }
}
