import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListacarritoxproductoComponent } from './listacarritoxproducto/listacarritoxproducto.component';

@Component({
  selector: 'app-carritoxproducto',
  standalone: true,
  imports:[RouterOutlet,ListacarritoxproductoComponent],
  templateUrl: './carritoxproducto.component.html',
  styleUrl: './carritoxproducto.component.css'
})
export class CarritoxProductoComponent {
constructor(public route:ActivatedRoute ){}
}
