import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcarritosComponent } from './listarcarritos/listarcarritos.component';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterOutlet,ListarcarritosComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  constructor(public route:ActivatedRoute){}
}
