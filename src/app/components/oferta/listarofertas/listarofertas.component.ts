import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Oferta } from '../../../models/Oferta';
import { OfertaService } from '../../../services/oferta.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-listarofertas',
  standalone: true,
  imports: [MatTableModule,RouterLink,MatIconModule,MatButtonModule],
  templateUrl: './listarofertas.component.html',
  styleUrl: './listarofertas.component.css'
})
export class ListarofertasComponent implements OnInit {
  dataSource:MatTableDataSource<Oferta>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','c4','c5','accion1','accion2']
  constructor(private oS:OfertaService){}
  ngOnInit(): void {
    this.oS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });  
    this.oS.getlist().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }
  eliminar(id:number){
    this.oS.delete(id).subscribe(data=>{
      this.oS.list().subscribe(data=>{
        this.oS.setlist(data)
      })
    })
  }
}
