import { React, ReactDOMServer, Twind, TwindSheets } from "@/dep.ts";
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
    const { tw } = Twind;

    return (
      <>
        <div className={tw`w-screen h-screen relative`} style={{ 
          background: '#f7d9a3', 
        }}>
          <div className={tw`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
            <header>
              <h1 className={tw`text-3xl text-center font-bold p-10`}>Simple Weather</h1>
            </header>
            <main className={ tw`rounded-2xl` } style={{ minWidth: '450px', background: '#ffffff' }}>
              <header className={tw`flex items-center justify-between px-6 py-4`} style={{ 
                borderBottom: '3px solid #D4D4D4', 
              }}>
                <div className={ tw`flex font-normal items-center` } >
                  <img className={ tw`w-6 h-6` } src="./assets/images/sun.png"></img>
                  <h2 className={ tw`text-lg ml-2 font-bold` }>Weather</h2>
                </div>
                <p>{this.weatherInfo?.locationName}</p>
              </header>
              
              <div className={ tw`flex text-center`} style={{ color: '#8C8B8B' }}>
                { (this.weatherInfo?.weatherElement ? this.weatherInfo?.weatherElement : []).map((weatherInfo: any, index: number) => (
                  <section key={index} style={{
                    padding: '2rem', 
                    width: 'calc(100% / 3)', 
                    ...this.changeBackground(index),
                  }}>
                    <h4 className={ tw`py-1` }>{weatherInfo.CIName}</h4>
                    <p className={ tw`py-1 text-black font-bold` }>{ weatherInfo.MaxTName + weatherInfo.MaxTUnit } / { weatherInfo.MinTName + weatherInfo.MinTUnit }</p>
                    <p className={ tw`py-1` }>{ this.formatDateTime(weatherInfo.startTime).date }</p>
                    <p className={ tw`py-1` }>{ this.formatDateTime(weatherInfo.startTime).time }</p>
                    <p className={ tw`py-1` }>降雨 { weatherInfo.PoPName } %</p>
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
