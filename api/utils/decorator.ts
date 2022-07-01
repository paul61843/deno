import { WEATHER_BASE, AUTH_CODE } from '../../env/index.ts';
import { BaseAPI } from '../common/base.ts';

const weatherAPI = new BaseAPI(WEATHER_BASE)

export const weatherGET = (apiPath: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.value = async () =>{
            const response = await weatherAPI.GET(apiPath, `/Authorization=${AUTH_CODE}`);
            return response.json();
        } 
    };
}