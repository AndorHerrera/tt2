import { BodyCharts } from "./_models/bodyCharts.model";

export class Constants {
    public static appName = "TT2";
    public static endpoint = 'http://localhost:3590/';
    public static endpointSonar = 'http://localhost:9000';
    public static bodyCharts:BodyCharts = new BodyCharts;
}
