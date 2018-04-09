import { Mesuare } from "./measure.model";
import { BodyMeasure } from "./bodyMeasure.model";
import { BodyChartsItems } from "./bodyIChartsItems.model";
import { FolderSonar } from "./folderSonar.model";

export class BodyCharts {
    
    bodyMesuare:BodyMeasure;
    idProyect:string;
    bugs:number;
    apestosas:number;
    vulnerabilidades:number;
    duplicados:number;
    ncloc:number;
    lenguaLabels: string[];
    lenguaSeries: number[];
    lenguaItems: BodyChartsItems[];
    status:string;
    statusFlad:boolean;
    days:number;
    pruebas:number;
    bloques_repetidos:number;
    reliability:number;
    sqale:number;
    security:number;
    ////// Medidas ////////
    violaciones:number;
    violacionesCriticas:number;
    violacionesBloques:number;
    violacionesMenores:number;
    violacionesMayores:number;
    costoRemediarCodigo:number;
    esfuerzoRemediacionSeguridad:number;
    esfuerzoRemediacionConfiabilidad:number;
    esfuerzoRemediacionMantebilidad:number;
    lineas:number;
    lineasComentadas:number;
    lineasSinPruebas:number;
    lineasDuplicadas:number;
    archivos:number;
    archivosDuplicados:number;
    complejidad:number;
    complejidadCognitiva:number;
    densidadComentarios:number;
    clases:number;
    declaraciones:number;
    funciones:number;
    issuesAbiertos:number;
    directorios:number;
    metricasRadar: number[];
    folders:FolderSonar[];
}