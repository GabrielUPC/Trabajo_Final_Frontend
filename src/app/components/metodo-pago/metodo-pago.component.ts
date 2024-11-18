import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListametodopagoComponent } from './listametodopago/listametodopago.component';

@Component({
  selector: 'app-metodo-pago',
  standalone: true,
  imports: [RouterOutlet,ListametodopagoComponent],
  templateUrl: './metodo-pago.component.html',
  styleUrl: './metodo-pago.component.css'
})
export class MetodoPagoComponent {
constructor(public route:ActivatedRoute){}
}
