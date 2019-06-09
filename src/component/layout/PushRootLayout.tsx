import * as React from 'react'
import * as Hammer from 'hammerjs'

import '@style/contact/contact_detail.css'
import { NavHeader, NavHeaderProps } from '@/component/header/NavHeader';
import { Scroll } from '@/component/content/Scroll';
import { RouteComponentProps } from 'react-router';

interface PushRootLayoutProps extends NavHeaderProps, RouteComponentProps {
    children?: React.ReactNode;
}

class PushRootLayout extends React.Component<PushRootLayoutProps> {
    static zIndex = 9999;
    private gesture: HammerManager;

    constructor(props: PushRootLayoutProps) {
        super(props);

        this.onSwipe = this.onSwipe.bind(this);
        this.onHashChange = this.onHashChange.bind(this);
    }

    componentDidMount() {
        this.gesture = new Hammer(document.getElementById("app"));
        this.gesture.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL });
        this.gesture.on("swipe", this.onSwipe);

        window.addEventListener("hashchange", this.onHashChange);
    }

    public componentWillUnmount() {
        this.gesture.off("swipe");
        this.gesture.destroy();
        window.removeEventListener("hashchange", this.onHashChange);
    }

    private onHashChange(event: HashChangeEvent) {
        // 当不在此页面时解除手势
        // console.log(event.newURL, this.props.match);
        if (!this.props.match.isExact) {
            this.gesture.off("swipe");
        } else {
            this.gesture.on("swipe", this.onSwipe);
        }
    }

    private onSwipe(event: HammerInput) {
        switch (event.direction) {
            case Hammer.DIRECTION_LEFT:
                if (this.props.onGoForward != null) {
                    this.props.onGoForward();
                }
                break;
            case Hammer.DIRECTION_RIGHT:
                if (this.props.onGoBack != null) {
                    this.props.onGoBack();
                }
                break;
        }
    }

    render() {
        return (
            <div styleName="root" style={{ zIndex: PushRootLayout.zIndex++ }}>
                <NavHeader {...this.props} />
                <Scroll>
                    {this.props.children}
                </Scroll>
            </div >
        );
    }
}

export {
    PushRootLayout
}