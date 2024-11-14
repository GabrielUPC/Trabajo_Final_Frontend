import { Productos } from "./Productos"

export class Review{
    idReview:number=0
    calificacion:number=0
    fecha:Date = new Date(Date.now())
    comentarios:string=""
    producto:Productos=new Productos()
}