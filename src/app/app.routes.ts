import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { OfertaComponent } from './components/oferta/oferta.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { CreaeditausuariosComponent } from './components/usuario/creaeditausuarios/creaeditausuarios.component';
import path from 'path';
import { Component } from '@angular/core';
import { CreaeditatiendasComponent } from './components/tienda/creaeditatiendas/creaeditatiendas.component';
import { CreaeditaofertasComponent } from './components/oferta/creaeditaofertas/creaeditaofertas.component';
import { CreaeditacarritosComponent } from './components/carrito/creaeditacarritos/creaeditacarritos.component';

export const routes: Routes = [
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
    ]
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
    ]
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
  },
  {
    path: 'carritos',
    component: CarritoComponent,
    children:[
      {
        path:'nuevo',component:CreaeditacarritosComponent
      },
      {
        path:'ediciones/:id',component:CreaeditacarritosComponent
      }
    ]
  },
];
