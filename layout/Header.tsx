import { React, Twind } from "@/dep.ts";

type Props = {};

export default class Header extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    const { tw } = Twind;

    return (
      <header>
        <h1 className={tw`text-3xl text-center font-bold p-10`}>
          Simple Weather
        </h1>
      </header>
    );
  }
}
