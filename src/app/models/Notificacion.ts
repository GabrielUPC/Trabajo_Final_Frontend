import { Usuario } from "./Usuario"

export class Notificacion{
    idNotificacion:number=0
    contenido:string=""
    fecha:Date = new Date(Date.now())
    u:Usuario=new Usuario()
}