import { Proyect } from "./proyect.model";
import { User } from "./user.model";

export class Buy {

    id:string;
    proyect:Proyect;
    user:User;
    fechaCreacion:Date;
}