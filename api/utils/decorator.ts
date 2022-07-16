import {
  WEATHER_BASE,
  AUTH_CODE,
  SERVER_BASE,
  DATABASE_BASE,
  PORT,
} from "@env/index.ts";
import { BaseAPI } from "../common/base.ts";
import { dataBasePostConfig } from "../common/config.ts";

const weatherAPI = new BaseAPI(WEATHER_BASE);
const serverAPI = new BaseAPI(`${SERVER_BASE}:${PORT}`);
const dataBaseAPI = new BaseAPI(`${DATABASE_BASE}`);

export const weatherGET = (apiPath: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = async () => {
      const response = await weatherAPI.GET(
        apiPath,
        `/?Authorization=${AUTH_CODE}`
      );
      return await response.json();
    };
  };
};

export const serverGET = (apiPath: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = async () => {
      const response = await serverAPI.GET(apiPath);
      return await response.json();
    };
  };
};

export const dataBasePOST = (apiPath: string, insertData: any) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const requestContent = {
      collection: "weather",
      database: "deno",
      dataSource: "Cluster0",
      ...insertData,
    };

    descriptor.value = async () => {
      const response = await dataBaseAPI.POST(
        apiPath,
        requestContent,
        dataBasePostConfig
      );
      return await response.json();
    };
  };
};
