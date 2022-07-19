import { getArgsPort } from "@utils/index.ts";

const port = getArgsPort();

export const WEATHER_API_TOKEN = "CWB-A0ED6CF8-2A45-4428-B425-944889FC14CB";
export const WEATHER_API_BASE = "https://opendata.cwb.gov.tw/api";

export const LOCAL_API_BASE = "http://localhost";

export const DATABASE_BASE =
  "https://data.mongodb-api.com/app/data-ybwtl/endpoint/data/v1";

export const PORT = port || 8080;

export const READABLE_FOLDER = ["assets", "build"];
