import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { OfertaComponent } from './components/oferta/oferta.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { CreaeditaTiendaComponent } from './components/tienda/creaedita-tienda/creaedita-tienda.component';

export const routes: Routes = [
    {path: 'ofertas', component:OfertaComponent,},
    {path: 'tiendas', component:TiendaComponent,
        children:[
            {path:':nuevo', component:CreaeditaTiendaComponent}
        ]
    },
];

