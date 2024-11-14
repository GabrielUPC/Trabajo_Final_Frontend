import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Notificacion } from '../../../models/Notificacion';
import { NotificacionService } from '../../../services/notificacion.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listanotificacion',
  standalone: true,
  imports: [MatTableModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './listanotificacion.component.html',
  styleUrl: './listanotificacion.component.css',
})
export class ListanotificacionComponent implements OnInit {
  dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'accion1', 'accion2'];
  constructor(private ns: NotificacionService) {}
  ngOnInit(): void {
    this.ns.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.ns.getlist().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.ns.delete(id).subscribe((data) => {
      this.ns.list().subscribe((data) => {
        this.ns.setlist(data);
      });
    });
  }
}
