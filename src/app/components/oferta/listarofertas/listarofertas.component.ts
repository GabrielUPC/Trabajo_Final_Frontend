import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Oferta } from '../../../models/Oferta';
import { OfertaService } from '../../../services/oferta.service';

@Component({
  selector: 'app-listarofertas',
  standalone: true,
  imports: [MatTableModule,RouterLink],
  templateUrl: './listarofertas.component.html',
  styleUrl: './listarofertas.component.css'
})
export class ListarofertasComponent implements OnInit {
  dataSource:MatTableDataSource<Oferta>=new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','c4','c5']
  constructor(private oS:OfertaService){}
  ngOnInit(): void {
    this.oS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    });
    
  }

}
