import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarserviciosclientesComponent } from './listarserviciosclientes/listarserviciosclientes.component';

@Component({
  selector: 'app-serviciocliente',
  standalone: true,
  imports: [RouterOutlet,ListarserviciosclientesComponent],
  templateUrl: './serviciocliente.component.html',
  styleUrl: './serviciocliente.component.css'
})
export class ServicioclienteComponent {
  constructor(public route:ActivatedRoute){}
}
