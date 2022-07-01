import { WEATHER_BASE, AUTH_CODE, SERVER_BASE, PORT } from '../../env/index.ts';
import { BaseAPI } from '../common/base.ts';

const weatherAPI = new BaseAPI(WEATHER_BASE);
const serverAPI = new BaseAPI(`${SERVER_BASE}:${PORT}`);

export const weatherGET = (apiPath: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.value = async () =>{
            const response = await weatherAPI.GET(apiPath, `/?Authorization=${AUTH_CODE}`);
            return response.json();
        } 
    };
}

export const serverGET = (apiPath: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.value = async () =>{
            const response = await serverAPI.GET(apiPath);
            return response.json();
        } 
    };
}