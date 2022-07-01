import { WEATHER_BASE, AUTH_CODE } from '../../env/index.ts';
import { baseHeaders, POSTConfig } from './config.ts';

export class BaseAPI {

    basePath: string;

    constructor(basePath: string, ) {
        this.basePath = basePath;
    }

    async GET(path: string, queryString: string): Promise<any> {
        const weatherUrl = `${this.basePath}/${path}${queryString}`;
        const config = {
            ...POSTConfig,
        };
    
        return await fetch(weatherUrl, config); 
    }

    async POST(path: string, requireContent: BodyInit): Promise<any> {
        const weatherUrl = `${this.basePath}/${path}`;
        const config = {
            body: requireContent,
            ...POSTConfig,
        };
    
        return await fetch(weatherUrl, config);
    }
    
}