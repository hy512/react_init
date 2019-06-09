import * as React from 'react'

import * as Hammer from 'hammerjs'

import './nav_header.css'

export interface NavHeaderProps {
    title: string;
    // goBack 的回调, 以及是否显示按钮图标
    onGoBack?: () => void;
    // goForward 的回调, 以及是否显示按钮图标
    onGoForward?: () => void;
}

class NavHeader extends React.Component<NavHeaderProps> {
    gesture: HammerManager;
    constructor(props: NavHeaderProps) {
        super(props);

        this.goBack = this.goBack.bind(this);
        this.goForward = this.goForward.bind(this);
        this.onSwipe = this.onSwipe.bind(this);
    }

    componentDidMount() {
        // 手势系统
        this.gesture = new Hammer(document.getElementById("app"));
        this.gesture.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL });
        this.gesture.on("swipe", this.onSwipe);

    }

    onSwipe(event: HammerInput) {
        switch (event.direction) {
            case Hammer.DIRECTION_LEFT:
                this.goForward();
                break;
            case Hammer.DIRECTION_RIGHT:
                this.goBack();
                break;
        }
    }

    goBack() {
        if (this.props.onGoBack != null) {
            this.props.onGoBack();
        }
    }

    goForward() {
        if (this.props.onGoForward != null) {
            this.props.onGoForward();
        }
    }

    render() {
        return (
            <header styleName="header"
                className="px-2 px-sm-3 px-md-4 shadow">
                <h1 className="lead d-inline">{this.props.title}</h1>
                {this.props.onGoBack ?
                    <span onClick={this.goBack}
                        className="fa fa-caret-left fa-lg px-2"></span>
                    : <span className="fa fa-lg px-2" style={{ width: 8 }}></span>}
                {this.props.onGoForward ?
                    <span onClick={this.goForward}
                        className="fa fa-caret-right fa-lg px-2"></span>
                    : <span className="fa fa-lg px-2" style={{ width: 8 }}></span>}
            </header>
        )
    }
}

export {
    NavHeader
}