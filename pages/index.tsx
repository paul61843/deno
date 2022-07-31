import { React, ReactDOMServer, Twind, TwindSheets } from "@/dep.ts";
import type { Weather, WeatherInfo, WeatherItem } from "@type/weather.ts";
import { CardHeader } from "@components/weather/CardHeader.tsx";
import { Info } from "@/components/weather/Info.tsx";
import BaseLayout from "@layout/Base.tsx";

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
        <BaseLayout>
          <CardHeader cityName={this.weatherInfo?.locationName || ""} />
          <div className={tw`flex text-center`} style={{ color: "#8C8B8B" }}>
            {(this.weatherInfo?.weatherElement
              ? this.weatherInfo?.weatherElement
              : []
            ).map((weatherInfo: any, index: number) => (
              <Info weatherInfo={weatherInfo} index={index} />
            ))}
          </div>
        </BaseLayout>
      </>
    );
  }
}
