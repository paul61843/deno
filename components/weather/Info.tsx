import { React, Twind } from "@/dep.ts";

type Props = {
  weatherInfo: any;
  index: number;
};

export class Info extends React.Component<Props> {
  twind = Twind;

  weatherInfo: any;
  index: number;

  constructor(props: Props) {
    super(props);

    this.weatherInfo = props.weatherInfo;
    this.index = props.index;
  }

  changeBackground(index: number) {
    if (index % 2 === 1) {
      return { background: "#f1f1f1" };
    }

    return {};
  }

  formatDateTime(startDate: string, formatStr: string = "") {
    const dayTime = new Date(startDate);
    const date = dayTime.getDate();
    const month = dayTime.getMonth() + 1;
    const hour = dayTime.getHours();

    return { date: `${month} / ${date}`, time: `${hour}` };
  }

  render(): React.ReactNode {
    const { tw } = Twind;

    return (
      <section
        key={this.index}
        className={tw`p-8 w-1/3`}
        style={{
          ...this.changeBackground(this.index),
        }}
      >
        <h4 className={tw`py-1`}>{this.weatherInfo.CIName}</h4>
        <p className={tw`py-1 text-black font-bold`}>
          {this.weatherInfo?.MaxTName + this.weatherInfo?.MaxTUnit} /{" "}
          {this.weatherInfo?.MinTName + this.weatherInfo?.MinTUnit}
        </p>
        <p className={tw`py-1`}>
          {this.formatDateTime(this.weatherInfo.startTime)?.date}
        </p>
        <p className={tw`py-1`}>
          {this.formatDateTime(this.weatherInfo.startTime)?.time} 時
        </p>
        <p className={tw`py-1`}>降雨 {this.weatherInfo.PoPName} %</p>
      </section>
    );
  }
}
