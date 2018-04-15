import { BodyCharts } from "./_models/bodyCharts.model";
import { Profile } from "./_models/profile.model";

export class Constants {
    public static appName = "TT2";
    public static endpoint = 'http://localhost:3590/';
    public static endpointSonar = 'http://localhost:9000';
    public static endpointAuth = 'https://manage.auth0.com/';
    public static bodyCharts:BodyCharts = new BodyCharts;
    public static profile:Profile = new Profile;
}