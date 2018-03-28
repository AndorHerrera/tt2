import { User } from "./user.model";
import { Proyect } from "./proyect.model";

export class Kanban {

    id:string;
    fechaCreacion:Date;
    fechaModificacion:Date;
    activo:boolean;
    proyect?:Proyect;
    users?: User[];

}