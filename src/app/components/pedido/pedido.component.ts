import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListapedidosComponent } from './listapedidos/listapedidos.component';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [RouterOutlet,ListapedidosComponent],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
constructor(public route:ActivatedRoute){}
}
