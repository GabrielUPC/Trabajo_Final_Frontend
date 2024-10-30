import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { OfertaComponent } from './components/oferta/oferta.component';
<<<<<<< HEAD
import { CarritoComponent } from './components/carrito/carrito.component';

export const routes: Routes = [
    {
        path: 'ofertas', component:OfertaComponent,
        
      },


      
      {path: 'Carrito', component:CarritoComponent,},
=======
import { TiendaComponent } from './components/tienda/tienda.component';
import { CreaeditaTiendaComponent } from './components/tienda/creaedita-tienda/creaedita-tienda.component';

export const routes: Routes = [
    {path: 'ofertas', component:OfertaComponent,},
    {path: 'tiendas', component:TiendaComponent,
        children:[
            {path:':nuevo', component:CreaeditaTiendaComponent}
        ]
    },
>>>>>>> a3b4ae9d19ba3a16c26ddd49df169fe6808c9fb2
];

