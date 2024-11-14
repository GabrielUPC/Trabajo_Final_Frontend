import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaproductosComponent } from './listaproductos/listaproductos.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports:[RouterOutlet,ListaproductosComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
 constructor(public route:ActivatedRoute){}
}
