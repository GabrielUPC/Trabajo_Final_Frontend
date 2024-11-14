import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListanotificacionComponent } from './listanotificacion/listanotificacion.component';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [RouterOutlet,ListanotificacionComponent],
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css'
})
export class NotificacionComponent {
constructor(public route:ActivatedRoute){}
}
