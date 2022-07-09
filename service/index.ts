import { cities } from "../constants/GPSPostition.ts";
import { getDistance } from "../utils/index.ts";

// 預設位置為台北市
const defaultCity = { latitude: 24.9466, longitude: 121.586 };

export function getNearestCity(GPSInfo) {
  const posititon2 = {
    latitude: GPSInfo.latitude || defaultCity.latitude,
    longitude: GPSInfo.longitude || defaultCity.longitude,
  };
  const distances = cities.map((posititon1) =>
    getDistance(posititon1, posititon2)
  );
  const minDistanceIndex = distances.findIndex(
    (item) => item === Math.min(...distances)
  );
  return cities[minDistanceIndex].city;
}
