import { getArgsPort } from "@utils/index.ts";

const port = getArgsPort();

export const AUTH_CODE = "CWB-A0ED6CF8-2A45-4428-B425-944889FC14CB";
export const WEATHER_BASE = "https://opendata.cwb.gov.tw/api";

export const SERVER_BASE = "http://172.104.121.44";

export const DATABASE_BASE =
  "https://data.mongodb-api.com/app/data-ybwtl/endpoint/data/v1";

export const PORT = port || 8080;

export const READABLE_FOLDER = ["assets", "build"];
