import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Oferta } from '../../../models/Oferta';
import { Tienda } from '../../../models/Tienda';

@Component({
  selector: 'app-listatiendas',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listatiendas.component.html',
  styleUrl: './listatiendas.component.css'
})
export class ListatiendasComponent {
  dataSource:MatTableDataSource<Tienda>=new MatTableDataSource();

}
