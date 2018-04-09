import { Mesuare } from "./measure.model";

export class BodyMeasure {
    id:string;
    key:string;
    name:string;
    qualifier:string;
    measures:Mesuare[];
    path?:string;
}