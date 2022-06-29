import { React, ReactDOMServer } from "../dep.ts";
import { WeatherAPI } from "../api/api.ts";

// const { useState, useEffect } = React;

export const App: React.FC<any> = (props: any) => {
  const records = props?.weather?.records;

  const title = <h1>{records?.datasetDescription}</h1>;
  const counties = records?.location;
  // const weather = records.weatherElemen;

  const list = (counties: any) =>
    counties.map((county: any) => (
      <li>
        <p>{county.locationName}</p>
        {county.weatherElement.map((info: any) => (
          <ul>
            <li>
              <p>{info.elementName}</p>
              <p>{JSON.stringify(info.time)}</p>
            </li>
          </ul>
        ))}
      </li>
    ));
  console.log(props?.weather?.records?.locationName);
  // const listElement = records.map(
  //   (record: { locationName: string; weatherElement: any[] }) => {
  //     return `
  //       <li>
  //       <p>${record.locationName}</p>
  //       <p>${JSON.stringify(record.weatherElement)}</p>
  //       </li>
  //     `;
  //   }
  // );
  // console.log(listElement);
  // return listElement.join();
  // React.useEffect(() => {
  //   console.log(true)
  //   const weatherAPI = new WeatherAPI();
  //   const { records } = weatherAPI.getTodayWeather() as any;
  //   console.log(records);
  // })

  // const location = records.location;
  // const listElem = location.map((item: any) => {
  //   return (<li>
  //     { item }
  //   </li>)
  // })

  return (
    <>
      <h1>{title}</h1>

      {records && <ul>{list(counties)}</ul>}
    </>
  );
};

export const Index = (appHtml: string) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        ${appHtml}
      </body>
    </html>
  `;
};

export const appHtml = Index(
  ReactDOMServer.renderToString(<App name={"app name"} />)
);
