import * as React from 'react'

import { SideMenu } from '@/component/header/SideMenu'
import { BottomTab } from '@/component/navigation/BottomTab'
import { Scroll } from '@/component/content/Scroll'
import './portal_layout.css'

interface PortalLayoutProps {
    navTabs: Array<{ icon: string, text: string }>;
    children: Array<React.ReactNode>;
    side: React.ReactNode;
    title: string;
}
interface PortalLayoutState {
    activeTab: number;
}

class PortalLayout extends React.Component<PortalLayoutProps, PortalLayoutState> {
    constructor(props: PortalLayoutProps) {
        super(props);
        this.state = {
            activeTab: 0
        }
    }

    public toggleTab(index: number) {
        this.setState({ activeTab: index });
    }

    render() {
        return (
            <div styleName="root">
                {this.props.children.map((m, i) => (
                    <Scroll key={i}
                        style={{ top: 55, bottom: 60, display: i !== this.state.activeTab ? "none" : "block" }}>
                        {m}
                    </Scroll>
                ))}
                <BottomTab>
                    {this.props.navTabs.map((m, i) => (
                        <div key={i}
                            styleName={"tab" + (i !== this.state.activeTab ? "" : " active")}
                            className="pt-1"
                            onClick={() => this.toggleTab(i)}>
                            <span className={m.icon}></span>
                            <span>{m.text}</span>
                        </div>
                    ))}
                </BottomTab>
                <SideMenu brand={this.props.title} >
                    {this.props.side}
                </SideMenu>
            </div>
        );
    }
}

export {
    PortalLayout
}