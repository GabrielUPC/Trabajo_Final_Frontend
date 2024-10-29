import { Component } from '@angular/core';
import { ActivatedRoute, Route, RouterOutlet } from '@angular/router';
import { ListarofertasComponent } from './listarofertas/listarofertas.component';

@Component({
  selector: 'app-oferta',
  standalone: true,
  imports: [RouterOutlet,ListarofertasComponent],
  templateUrl: './oferta.component.html',
  styleUrl: './oferta.component.css'
})
export class OfertaComponent {
  constructor(public route:ActivatedRoute){}

}
