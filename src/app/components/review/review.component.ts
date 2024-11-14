import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListareviewsComponent } from "./listareviews/listareviews.component";

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [ListareviewsComponent,RouterOutlet],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  constructor(public route:ActivatedRoute){}

}
