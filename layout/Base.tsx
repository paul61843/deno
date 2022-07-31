import { React, Twind } from "@/dep.ts";
import Header from "./Header.tsx";

type Props = {
  children: React.ReactNode;
};

export default class BasicLayout extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    const { tw } = Twind;
    return (
      <div
        className={tw`w-screen h-screen relative`}
        style={{
          background: "#f7d9a3",
        }}
      >
        <div
          className={tw`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        >
          <Header />
          <main
            className={tw`rounded-2xl`}
            style={{ minWidth: "350px", background: "#ffffff" }}
          >
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}
