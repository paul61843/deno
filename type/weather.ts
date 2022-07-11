export type Weather = WeatherInfo[];

export type WeatherInfo = Partial<{
    locationName: string;
    weatherElement: Partial<WeatherItem>[];
}>

export type WeatherItem = {
    startTime: string;
    endTime: string;
    WxName: string;
    WxValue: number;
    PoPName: number;
    PoPUnit: string;
    MinTName: number;
    MinTUnit: string;
    CIName: string;
    MaxTName: number;
    MaxTUnit: string;
}
