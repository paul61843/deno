import { React, Twind } from "@/dep.ts";
import Info from "@components/weather/Info.tsx";
import { WeatherItem } from "@type/weather.ts";

type Props = {
  weatherElement: Partial<WeatherItem>[] | undefined;
};

export default class CardContent extends React.Component<Props> {
  readonly twind = Twind;

  private weatherElement: any;

  constructor(props: Props) {
    super(props);
    this.weatherElement = props.weatherElement ?? [];
  }

  render(): React.ReactNode {
    const { tw } = this.twind;

    return (
      <div className={tw`flex text-center`} style={{ color: "#8C8B8B" }}>
        {this.weatherElement.map((weatherInfo: any, index: number) => (
          <Info weatherInfo={weatherInfo} index={index} />
        ))}
      </div>
    );
  }
}
