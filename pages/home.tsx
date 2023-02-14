import { React } from "@/dep.ts";
import type { WeatherInfo } from "@type/weather.ts";
import CardHeader from "@components/weather/CardHeader.tsx";
import CardContent from "@/components/weather/CardContent.tsx";
import BaseLayout from "@layout/Base.tsx";

type Props = {
  weather: WeatherInfo;
};

export class HomeTemplate extends React.Component<Props> {
  weatherInfo: WeatherInfo = {};

  constructor(props: Props) {
    super(props);
    this.weatherInfo = props.weather;
  }

  render(): React.ReactNode {
    return (
      <>
        <BaseLayout>
          <CardHeader cityName={this.weatherInfo?.locationName} />
          <CardContent weatherElement={this.weatherInfo?.weatherElement} />
        </BaseLayout>
      </>
    );
  }
}
