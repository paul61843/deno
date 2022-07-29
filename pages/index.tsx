import { React, ReactDOMServer, Twind, TwindSheets } from "@/dep.ts";
import type { Weather, WeatherInfo, WeatherItem } from "@type/weather.ts";
import { CardHeader } from "@components/weather/CardHeader.tsx";
import { Info } from "@/components/weather/Info.tsx";

type Props = {
  weather: WeatherInfo;
};

export class WeatherTemplate extends React.Component<Props> {
  weatherInfo: WeatherInfo = {};

  constructor(props: Props) {
    super(props);
    this.weatherInfo = props.weather;
  }

  render(): React.ReactNode {
    const { tw } = Twind;

    return (
      <>
        <div
          className={tw`w-screen h-screen relative`}
          style={{
            background: "#f7d9a3",
          }}
        >
          <div
            className={tw`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            <header>
              <h1 className={tw`text-3xl text-center font-bold p-10`}>
                Simple Weather
              </h1>
            </header>
            <main
              className={tw`rounded-2xl`}
              style={{ minWidth: "350px", background: "#ffffff" }}
            >
              <CardHeader cityName={this.weatherInfo?.locationName || ""} />
              <div
                className={tw`flex text-center`}
                style={{ color: "#8C8B8B" }}
              >
                {(this.weatherInfo?.weatherElement
                  ? this.weatherInfo?.weatherElement
                  : []
                ).map((weatherInfo: any, index: number) => (
                  <Info weatherInfo={weatherInfo} index={index} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }
}
