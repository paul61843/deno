import { React, ReactDOMServer } from "../dep.ts";
import { WeatherAPI } from "../api/api.ts";
import TableComponent from "../components/table/Table.tsx";

const { useState, useEffect } = React;

export class App extends React.Component {

  title: string;
  records: any[];
  counties: any[];

  constructor(props: any) {
    super(props);
    const weather = props.weather;
    this.records = weather?.records;
    this.counties = this.records?.location;    
    this.title = this.records?.datasetDescription;
  }

  formatData(data: any[]) {
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

    list(counties: any) {
      return counties.map((county: any, countyIdx: string) => (
        <li key={countyIdx}>
        <p>{county.locationName}</p>
        {county.weatherElement.map((info: any, infoIdx: string) => (
          <ul key={infoIdx}>
            <li>
              <p>{info.elementName}</p>
              <TableComponent source={this.formatData(info.time)}></TableComponent>
            </li>
          </ul>
        ))}
        </li>
      ));
    }

  render() {
    return (
     <>
      <h1>{this.title}</h1>
      <ul>{this.list(this.counties)}</ul>
    </>
    );
  }

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


