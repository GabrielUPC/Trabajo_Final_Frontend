import { Routes } from '@angular/router';
import { ReviewComponent } from './components/review/review.component';
import { CreaeditareviewsComponent } from './components/review/creaeditareviews/creaeditareviews.component';
import { ReclamoComponent } from './components/reclamo/reclamo.component';
import { CreaeditareclamosComponent } from './components/reclamo/creaeditareclamos/creaeditareclamos.component';
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
];
