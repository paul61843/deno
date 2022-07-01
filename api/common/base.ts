import { WEATHER_BASE, AUTH_CODE, PORT } from '../../env/index.ts';
import { GETConfig, POSTConfig } from './config.ts';

export class BaseAPI {

    basePath: string;

    constructor(basePath: string, ) {
        this.basePath = basePath;
    }

    async GET(path: string, queryString: string = ''): Promise<any> {
        const apiUrl = `${this.basePath}${path}${queryString}`;
        const config = {
            ...GETConfig,
        };
        return await fetch(apiUrl, config); 
    }

    async POST(path: string, requireContent: BodyInit): Promise<any> {
        const apiUrl = `${this.basePath}${path}`;
        const config = {
            body: requireContent,
            ...POSTConfig,
        };
    
        return await fetch(apiUrl, config);
    }
    
}