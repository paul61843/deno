import { HomeTemplate } from "@pages/home.tsx";
import { WeatherAPI, ServerAPI } from "@api/api.ts";
import { getGPSInfo } from "@utils/index.ts";
import { React, ReactDOMServer, Twind, TwindSheets } from "@/dep.ts";
import { getNearestCity } from "@/service/index.ts";

const sheet = TwindSheets.virtualSheet();

Twind.setup({ sheet });

const serverAPI = new ServerAPI();

type Context = {
  request: any;
  response: any;
};

export async function home({ request, response }: Context) {
  try {
    const { currentWeather } = await getData(request, response);

    sheet.reset();
    const body = ReactDOMServer.renderToString(
      <HomeTemplate weather={currentWeather} />
    );
    const styleTag = TwindSheets.getStyleTag(sheet);

    response.type = "text/html";
    response.body = await renderHtml(styleTag, body);
  } catch (error) {
    console.log(error)
    response.body = error;
  }
}

async function getData(req, res) {
  const formatedWeather = await serverAPI.getfomatedTodayWeather();
  const GPSInfo = await getGPSInfo(req.ip);
  const nearestCity = getNearestCity(GPSInfo);
  const currentWeather = formatedWeather.find(
    (item: any) => item.locationName === nearestCity
  );

  return { currentWeather }
}

// 引入 Html 模板，並將 styleTag 和 body 插入
// fixme: 這邊重新整理後，twind style會重複出現，但是不影響使用
async function renderHtml(style, body) {
  const baseTemplate = await import('@template/base.ts');
  const templateDocument = baseTemplate.document;
  templateDocument.head.insertAdjacentHTML("beforeend", style)
  templateDocument.body.innerHTML = body;

  return templateDocument.toString();
}