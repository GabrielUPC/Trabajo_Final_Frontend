import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartiendasComponent } from './listartiendas/listartiendas.component';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [RouterOutlet,ListartiendasComponent],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent {
  constructor(public route:ActivatedRoute){}
}
