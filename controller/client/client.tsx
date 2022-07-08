import { Index, WeatherTemplate } from "../../pages/index.tsx";
import { WeatherAPI, ServerAPI } from "../../api/api.ts";
import { writeJson, readJson, makeDirectory, getToday, getGPSInfo, getDistance } from '../../utils/index.ts';
import { React, ReactDOMServer } from "../../dep.ts";
import { cities } from "../../constants/GPSPostition.ts";

const serverAPI = new ServerAPI();

export async function index ({ request, response }) {
    try {
        const formatedWeather = await serverAPI.getfomatedTodayWeather();
        const GPSInfo = await getGPSInfo(request.ip);
        const posititon2 = { latitude: GPSInfo.latitude || 24.9466, longitude: GPSInfo.longitude || 121.586 };
        const distances = cities.map((posititon1) => getDistance(posititon1, posititon2))
        const minDistanceIndex = distances.findIndex(item => item === Math.min(...distances));
        const neastCity = cities[minDistanceIndex].city;
        const currentWeather = formatedWeather.find((item) => item.locationName === neastCity);
    
        response.type = "text/html";
        response.body = Index(ReactDOMServer.renderToString(<WeatherTemplate weather={currentWeather} />));        
    } catch (error) {
        response.body = 'error';
    }
};