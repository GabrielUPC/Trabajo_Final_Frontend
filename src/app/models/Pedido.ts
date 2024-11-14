
import { CarritoxProducto } from "./CarritoxProducto"

export class Pedido{
    idPedido:number=0
    fechacPedido:Date = new Date(Date.now())
    fechaEntrega:Date = new Date(Date.now())
    estado:string=""
    carritoxProducto:CarritoxProducto=new CarritoxProducto()
}