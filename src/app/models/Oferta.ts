import { Usuario } from "./Usuario"

export class Oferta{
    idOferta:number=0
    nombreOferta:string=""
    fechaInicio:Date = new Date(Date.now())
    fechaFin:Date = new Date(Date.now())
    cantidad:number=0
    u:Usuario=new Usuario()
}