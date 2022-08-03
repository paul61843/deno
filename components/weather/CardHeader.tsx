import { React, Twind,  } from "@/dep.ts";

type Props = {
  cityName: string;
};

export default class CardHeader extends React.Component<Props> {
  readonly twind = Twind;

  private cityName: string;

  constructor(props: Props) {
    super(props);
    this.cityName = props.cityName;
  }

  render(): React.ReactNode {
    const { tw } = this.twind;

    return (
      <header
        className={tw`flex items-center justify-between px-6 py-4`}
        style={{
          borderBottom: "3px solid #D4D4D4",
        }}
      >
        <div className={tw`flex font-normal items-center`}>
          <img className={tw`w-6 h-6`} src="./assets/images/sun.png"></img>
          <h2 className={tw`text-lg ml-2 font-bold`}>Weather</h2>
        </div>
        <p>{this.cityName}</p>
      </header>
    );
  }
}
