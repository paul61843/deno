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

export class WeatherTemplate extends React.Component {

  weather: any;

  constructor(props: { weather: any }) {
    super(props);
    this.weather = props.weather[0];
  }

  changeBackground(index: number) {
    if (index % 2 === 1) {
      return { background: '#f1f1f1' }
    }

    return {};
  }

  formatDate(startDate: string, formatStr: string = '') {
    const dayTime = new Date(startDate);
    const date = dayTime.getDate();
    const month = dayTime.getMonth() + 1;
    const hour = dayTime.getHours();

    return { date: `${month} / ${date}`, time: `${hour}` };
  }

  render() {
    return (
      <>
        <div style={{ 
          background: '#f7d9a3', 
          width: '100vw', 
          height: '100vh', 
          display: 'flex', 
          justifyContent: "center",
          alignItems: "center",
        }}>

          <div style={{ width: '450px', background: '#ffffff', borderRadius: "20px" }}>
            <header style={{ 
              display: "flex",
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '3px solid #D4D4D4', 
              padding: '.5rem 1.5rem',
            }}>
              <h2 style={{ fontWeight: 'normal' }}>
                {/* <img src="../assets/images/sun.png"></img> */}
                Weather
              </h2>
              <p>{this.weather.locationName}</p>
            </header>
            <main style={{ display: "flex", color: '#8C8B8B', textAlign: "center" }}>
              { this.weather.weatherElement.map((weatherInfo: any, index: number) => (
                <section key={index} style={{
                  padding: '2rem', 
                  width: 'calc(100% / 3)', 
                  ...this.changeBackground(index),
                }}>
                  <h4>{weatherInfo.CIName}</h4>
                  <p style={{ color: 'black', fontWeight: 'bold' }}>{ weatherInfo.MaxTName + weatherInfo.MaxTUnit } / { weatherInfo.MinTName + weatherInfo.MinTUnit }</p>
                  <p>{ this.formatDate(weatherInfo.startTime).date }</p>
                  <p>{ this.formatDate(weatherInfo.startTime).time }</p>
                  <p>降雨 { weatherInfo.PoPName } %</p>
                </section>
              ))}
            </main>
          </div>
        </div>
      </>
    );
  }
}

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
      <style>
        * {
          box-sizing: border-box;
          font-family: 微軟正黑體;
        }
        html, body {
          padding: 0;
          margin: 0;
        }
        h1, h2, h3, h4, h5 {
          margin: 0;
        }
        
      </style>
      <body>
        ${appHtml}
      </body>
    </html>
  `;
};


