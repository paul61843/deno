import { React, ReactDOMServer } from "@/dep.ts";
import type { Weather, WeatherInfo, WeatherItem } from "@type/weather.ts";
export class WeatherTemplate extends React.Component {

  weatherInfo: WeatherInfo = {};

  constructor(props: { weather: WeatherInfo }) {
    super(props);
    this.weatherInfo = props.weather;
  }

  changeBackground(index: number) {
    if (index % 2 === 1) {
      return { background: '#f1f1f1' }
    }

    return {};
  }

  formatDateTime(startDate: string, formatStr: string = '') {
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
          position: "relative",
        }}>
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}>
            <header>
              <h1 style={{ textAlign: "center", padding: "2.5rem" }}>Simple Weather</h1>
            </header>
            <main style={{ width: '450px', background: '#ffffff', borderRadius: "20px" }}>
              <header style={{ 
                display: "flex",
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '3px solid #D4D4D4', 
                padding: '.5rem 1.5rem',
              }}>
                <div style={{ display: 'flex', fontWeight: 'normal', alignItems: 'center' }}>
                  <img src="./assets/images/sun.png" style={{ width: "25px", height: "25px" }}></img>
                  <h2 style={{ fontSize: "1.2rem", marginLeft: ".5rem" }}>Weather</h2>
                </div>
                <p>{this.weatherInfo?.locationName}</p>
              </header>
              
              <div style={{ display: "flex", color: '#8C8B8B', textAlign: "center" }}>
                { (this.weatherInfo?.weatherElement ? this.weatherInfo?.weatherElement : []).map((weatherInfo: any, index: number) => (
                  <section key={index} style={{
                    padding: '2rem', 
                    width: 'calc(100% / 3)', 
                    ...this.changeBackground(index),
                  }}>
                    <h4>{weatherInfo.CIName}</h4>
                    <p style={{ color: 'black', fontWeight: 'bold' }}>{ weatherInfo.MaxTName + weatherInfo.MaxTUnit } / { weatherInfo.MinTName + weatherInfo.MinTUnit }</p>
                    <p>{ this.formatDateTime(weatherInfo.startTime).date }</p>
                    <p>{ this.formatDateTime(weatherInfo.startTime).time }</p>
                    <p>降雨 { weatherInfo.PoPName } %</p>
                  </section>
                ))}
              </div>
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


