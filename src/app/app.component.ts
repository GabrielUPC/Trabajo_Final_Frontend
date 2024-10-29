import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioComponent } from "./components/usuario/usuario.component";
import { OfertaComponent } from "./components/oferta/oferta.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    UsuarioComponent, 
    OfertaComponent,MatMenuModule,MatIconModule,
    MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TRABAJO_FINAl';
}
