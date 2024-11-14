import { Pedido } from "./Pedido"

export class Reclamo{
    idReclamos:number=0
    contenidoReclamo:string=""
    fechaReclamo:Date = new Date(Date.now())
    p:Pedido=new Pedido()
}