import { WEATHER_BASE, AUTH_CODE } from '../env/index.ts';


const weatherAPI = async (path: string) => {

    return await fetch(`${WEATHER_BASE}/${path}/?Authorization=${AUTH_CODE}`, {
        headers: {
            'Accept': 'application/json'
          }
    })
}


export const GET = (apiPath: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.value = async () =>{
            const response = await weatherAPI(apiPath);
            return response.json();
        } 
    };
}