import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListareclamosComponent } from './listareclamos/listareclamos.component';

@Component({
  selector: 'app-reclamo',
  standalone: true,
  imports:[ListareclamosComponent,RouterOutlet],
  templateUrl: './reclamo.component.html',
  styleUrl: './reclamo.component.css'
})
export class ReclamoComponent {
  constructor(public route:ActivatedRoute){}
}
