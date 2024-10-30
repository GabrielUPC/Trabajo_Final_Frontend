import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioComponent } from "./components/usuario/usuario.component";
import { OfertaComponent } from "./components/oferta/oferta.component";
import { TiendaComponent } from "./components/tienda/tienda.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CarritoComponent } from './components/carrito/carrito.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    UsuarioComponent, 
<<<<<<< HEAD
    OfertaComponent,MatMenuModule,MatIconModule,
    MatToolbarModule,CarritoComponent],
=======
    OfertaComponent,TiendaComponent,MatMenuModule,MatIconModule,
    MatToolbarModule],
>>>>>>> a3b4ae9d19ba3a16c26ddd49df169fe6808c9fb2
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TRABAJO_FINAl';
}
