import {
  cron,
  everyMinute,
} from "https://deno.land/x/deno_cron@v1.0.0/cron.ts";

import { WeatherAPI } from "@api/api.ts";

const weatherApi = new WeatherAPI();

export const start = () => {
  //   everyMinute(() => {
  //   });
};
