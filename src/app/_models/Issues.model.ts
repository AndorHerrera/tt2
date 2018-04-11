import { TextRange } from "./textRange.model";

export class Issues {
    
    key:string;
    rule:string;
    severity:string;
    component:string;
    project:string;
    line:number;
    textRange:TextRange;
    status:string;
    message:string;
    effort:string;
    type:string;
    
}