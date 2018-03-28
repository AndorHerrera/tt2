import { User } from "./user.model";
import { Proyect } from "./proyect.model";
import { UserMin } from "./user.min.model";

export class HomeworkMin {

    id:string;
    title:string;
    description:string;
    deliveryDate:Date;
    idKanban:string;
    author:UserMin;
    assigned:UserMin;
    status:string;

}