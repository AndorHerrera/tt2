import { User } from "./user.model";
import { Proyect } from "./proyect.model";
import { UserMin } from "./user.min.model";
import { Kanban } from "./kanban.model";

export class Homework {

    id:string;
    title:string;
    description:string;
    deliveryDate:Date;
    idKanban:string;
    author:User;
    assigned:User;
    status:string;
    kanban:Kanban;
    priority:string;

}