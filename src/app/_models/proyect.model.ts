import { User } from "./user.model";
import { Tag } from "./tag.model";

export class Proyect {

    id:string;
    fechaCreacion:Date;
    fechaModificacion:Date;
    activo:boolean;
    title:string;
    description:string;
    price:number;
    version:string;
    image:Blob;
    idUser:string;
    status:string;
    tags?:Tag[];
    sonar:boolean;
}