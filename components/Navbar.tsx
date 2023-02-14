import { React, Twind } from "@/dep.ts";

type Props = {};

export default class NarBar extends React.Component<Props> {

    navList = [
        { name: '當天氣象', path: '/'},
        { name: '歷史資料', path: '/history'},
        { name: '編輯歷史資料', path: '/edit-history'},
    ];

    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactElement {
    const { tw } = Twind;
        return (
            <nav className={tw`bg-yellow-100`} >
                <ul className={tw`flex`}>
                    {this.navList.map((navItem) => {
                        return <li key={navItem.name}><a href={navItem.path} className={tw`block px-4 py-2`}>{navItem.name}</a></li>
                    })}
                </ul>
            </nav>
        )
    }
}