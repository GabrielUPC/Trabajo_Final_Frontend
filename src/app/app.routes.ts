import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditausuariosComponent } from './components/usuario/creaeditausuarios/creaeditausuarios.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { CreaeditatiendasComponent } from './components/tienda/creaeditatiendas/creaeditatiendas.component';
import { ReviewComponent } from './components/review/review.component';
import { CreaeditareviewsComponent } from './components/review/creaeditareviews/creaeditareviews.component';
import { ReclamoComponent } from './components/reclamo/reclamo.component';
import { CreaeditareclamosComponent } from './components/reclamo/creaeditareclamos/creaeditareclamos.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CreaeditaproductosComponent } from './components/productos/creaeditaproductos/creaeditaproductos.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { CreaeditapedidosComponent } from './components/pedido/creaeditapedidos/creaeditapedidos.component';
import { OfertaComponent } from './components/oferta/oferta.component';
import { CreaeditaofertasComponent } from './components/oferta/creaeditaofertas/creaeditaofertas.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { CreaeditanotificacionComponent } from './components/notificacion/creaeditanotificacion/creaeditanotificacion.component';
import { MetodoPagoComponent } from './components/metodo-pago/metodo-pago.component';
import { CreaeditametodopagoComponent } from './components/metodo-pago/creaeditametodopago/creaeditametodopago.component';
import { CarritoxProductoComponent } from './components/carritoxproducto/carritoxproducto.component';
import { CreaditacarritoxproductoComponent } from './components/carritoxproducto/creaditacarritoxproducto/creaditacarritoxproducto.component';
import { ServicioclienteComponent } from './components/serviciocliente/serviciocliente.component';
import { CreaeditaserviciosclientesComponent } from './components/serviciocliente/creaeditaserviciosclientes/creaeditaserviciosclientes.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CreaeditacarritosComponent } from './components/carrito/creaeditacarritos/creaeditacarritos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { seguridadGuard } from './guard/seguridad.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'homes',
    component: HomeComponent,
   // solo construcciones, se debe agregar a cada uno
  },
  {
    
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditausuariosComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditausuariosComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'tiendas',
    component: TiendaComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditatiendasComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditatiendasComponent,
      }
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'servicios',
    component:ServicioclienteComponent,
    children:[
      {
        path:'nueva',component:CreaeditaserviciosclientesComponent
      },
      {
        path:'ediciones/:id',component:CreaeditaserviciosclientesComponent
      }
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'carritos',
    component:CarritoComponent,
    children:[
      {
        path:'nueva',component:CreaeditacarritosComponent
      },
      {
        path:'ediciones/:id',component:CreaeditacarritosComponent
      }
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'reviews',
    component: ReviewComponent,
    children:[
      {
        path:'nuevo',component:CreaeditareviewsComponent
      },
      {
        path:'ediciones/:id',component:CreaeditareviewsComponent
      }
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'reclamos',
    component: ReclamoComponent,
    children:[
      {
        path:'nuevo',component:CreaeditareclamosComponent
      },
      {
        path:'ediciones/:id',component:CreaeditareclamosComponent

      }
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'productos',
    component: ProductosComponent,
    children:[
      {
        path:'nuevo',component:CreaeditaproductosComponent
      },
      {
        path:'ediciones/:id',component:CreaeditaproductosComponent
      }
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'pedidos',
    component: PedidoComponent,
    children:[
      {
        path:'nuevo',component:CreaeditapedidosComponent
      },
      {
        path:'ediciones/:id',component:CreaeditapedidosComponent
      }
    ],
    canActivate: [seguridadGuard],
  },
  
  {
    path: 'ofertas',
    component: OfertaComponent,
    children:[
      {
        path:'nuevo',component:CreaeditaofertasComponent,
      },
      {
        path:'ediciones/:id',
        component:CreaeditaofertasComponent,
      }
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'notificaciones',
    component: NotificacionComponent,
    children:[
      {
        path:'nuevo',component:CreaeditanotificacionComponent,
      },
      {
        path:'ediciones/:id',component:CreaeditanotificacionComponent,
      }
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'metodopagos',
    component: MetodoPagoComponent,
    children:[
      {
        path:'nuevo',component:CreaeditametodopagoComponent
      },
      {
        path:'ediciones/:id',component:CreaeditametodopagoComponent
      }
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'CarritoProductos',
    component: CarritoxProductoComponent,
    children:[
      {
        path:'nuevo',component:CreaditacarritoxproductoComponent
      },
      {
        path:'ediciones/:id',component:CreaditacarritoxproductoComponent
      }
    ],
    canActivate: [seguridadGuard],
  },
  
  
];
