type Position = {
    longitude: number;
    latitude: number;
}

type GPSInfo = Partial<{
  ip: string;
  version: string;
  latitude: number;
  longitude: number;
}>

export async function getGPSInfo(ip: string): Promise<GPSInfo> {
    return await fetch(`https://ipapi.co/${ip}/json/`).then(res => res.json());
}

export function getDistance(position1: Position, position2: Position): number {
    const latDistance = position1.latitude - position2.latitude;
    const lonDistance = position1.longitude - position2.longitude;
    return Math.sqrt(Math.pow(latDistance, 2) + Math.pow(lonDistance, 2));
}

export function getNearestCity(cities: any[]) {

}