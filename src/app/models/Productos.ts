import { Oferta } from "./Oferta"

import { Usuario } from "./Usuario"

export class Productos{
    idProducto:number=0
    nombreProducto:string=""
    descripcionProducto:string=""
    precioProducto:number=0
    estadoProducto:string="" 
    fechavencimiento:Date =new Date(Date.now())
    stockProducto:number=0
    u:Usuario=new Usuario()
   
    o:Oferta=new Oferta()
}