import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportesproductosvendidosComponent } from './reportesproductosvendidos/reportesproductosvendidos.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports:[RouterOutlet,ReportesproductosvendidosComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
constructor(public route:ActivatedRoute){}
}
