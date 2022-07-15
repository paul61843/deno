import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { PORT } from "@env/index.ts";
import { WEATHER_TODAY, WEATHER_TODAY_Search } from "@api/common/path.ts";
import * as client from "@controller/client/client.tsx";
import * as server from "@controller/server/server.tsx";
import * as middleware from '@middleware/index.ts';

const app = new Application();
const router = new Router();

// api router
router.get(WEATHER_TODAY, server.weatherToday);
router.get("/weather/today/formated", server.weatherFormated);
router.get(WEATHER_TODAY_Search, server.weatherSearch);

// client router
router.get("/", client.index);

// middleware
app.use(middleware.allowedReadFile);

// router
app.use(router.routes());
app.use(router.allowedMethods());

try {
    await app.listen({ port: PORT });
} catch (error) {
    console.log('error', error)
}
