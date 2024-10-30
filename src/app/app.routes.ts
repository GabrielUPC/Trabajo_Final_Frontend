import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { OfertaComponent } from './components/oferta/oferta.component';
import { CarritoComponent } from './components/carrito/carrito.component';

export const routes: Routes = [
    {
        path: 'ofertas', component:OfertaComponent,
        
      },


      
      {path: 'Carrito', component:CarritoComponent,},
];
