import { React, ReactDOMServer } from "../dep.ts";
import { WeatherAPI } from "../api/api.ts";
import TableComponent from "../components/table/Table.tsx";

// const { useState, useEffect } = React;

export const App: React.FC<any> = (props: any) => {
  const records = props?.weather?.records;

  const title = <h1>{records?.datasetDescription}</h1>;
  const counties = records?.location;

  const formatData = (data: any[]) => {
    const flatObj = ({
      startTime,
      endTime,
      parameter: { parameterName, parameterValue },
    }) => ({ startTime, endTime, parameterName, parameterValue });

    const flattedData = data.reduce((previousValue: any[], info) => {
      return [...previousValue, flatObj(info)];
    }, []);

    const tableHead = Object.keys(flattedData[0]);
    const tableBody = flattedData.map((item) => Object.values(item));

    return {
      tableHead,
      tableBody,
    };
  };

  const list = (counties: any) =>
    counties.map((county: any, countyIdx: string) => (
      <li key={countyIdx}>
        <p>{county.locationName}</p>
        {county.weatherElement.map((info: any, infoIdx: string) => (
          <ul key={infoIdx}>
            <li>
              <p>{info.elementName}</p>
              <TableComponent source={formatData(info.time)}></TableComponent>
            </li>
          </ul>
        ))}
      </li>
    ));

  React.useEffect(() => {
    console.log("useEffect");
  });

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
