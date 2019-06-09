/**
 * 组件最近的 position 定位父级应当全屏显示, 因为侧栏是通过 absolute 方式实现的.
 */
import * as React from 'react'
import { Tween, Easing } from '@tweenjs/tween.js'
import * as Hammer from 'hammerjs'
import './side_menu.css'

interface SideMenuProps {
    brand: string; // 标题
    children: React.ReactNode;
    width?: number;
    // 当前页面是否处于活动. 判断是否需要禁用手势系统。
    isActive?: boolean;
}

interface SideMenuState {
    showSide: boolean;
    sideOpacity: number;
    sideOffset: number;
    sideWidth: number;
}

type ValueArea = [number, number];

class SideMenu extends React.Component<SideMenuProps, SideMenuState> {
    // 动画的配置
    static readonly sideOpacityArea: ValueArea = [0, 1];
    static sideOffsetyArea: ValueArea = [-65, 0];
    static readonly sideDuration: number = 500;

    state: SideMenuState;
    props: SideMenuProps;
    sideAnimate: Tween;
    sideGesture: HammerManager;

    constructor(props: SideMenuProps) {
        super(props);

        this.state = {
            showSide: false,
            sideOpacity: 0,
            sideOffset: -65,
            sideWidth: 65,
        };

        if (props.width) {
            this.state.sideWidth = props.width > 100 ? 100 : (props.width < 0 ? 0 : props.width);
            SideMenu.sideOffsetyArea[0] = -this.state.sideWidth;
        }

        this.toggleSide = this.toggleSide.bind(this);
    }

    /**
     * 切换侧栏的展开状态
     * @param event 
     */
    public toggleSide(event?: React.MouseEvent<HTMLSpanElement, MouseEvent>): void {
        if (event) event.stopPropagation();

        let state = this.state;
        let showSide = !state.showSide;

        if (this.sideAnimate) {
            this.sideAnimate.stop();
        }

        this.sideAnimate = new Tween({
            sideOpacity: state.sideOpacity,
            sideOffset: state.sideOffset
        })
            .to(showSide ? {
                sideOpacity: SideMenu.sideOpacityArea[1],
                sideOffset: SideMenu.sideOffsetyArea[1]
            } : {
                    sideOpacity: SideMenu.sideOpacityArea[0],
                    sideOffset: SideMenu.sideOffsetyArea[0]
                }, SideMenu.sideDuration)
            .easing(Easing.Quartic.Out)
            .onUpdate(props => this.setState(props))
            .onStart(() => {
                if (showSide)
                    this.setState({ showSide });
            })
            .onComplete(() => {
                if (!showSide)
                    this.setState({ showSide });
            })
            .start();

    }

    public componentDidMount() {
        // 打开侧栏的手势
        let hammer = this.sideGesture = new Hammer(document.getElementById("app") || document.body);
        hammer.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL });
        hammer.get("tap").set({ taps: 2 });
        hammer.on("swipe", this.onSwipe);
        hammer.on("tap", this.onTap);

    }

    public componentWillUnmount() {
        // 销毁手势系统
        this.sideGesture.off("swipe tap");
        this.sideGesture.destroy();
    }

    private onSwipe(event: HammerInput) {
        if (event.deltaX > 0 && !this.state.showSide) {
            this.toggleSide();
        } else if (event.deltaX < 0 && this.state.showSide) {
            this.toggleSide();
        }
    }

    private onTap(event: HammerInput) {
        if (!this.state.showSide) {
            this.toggleSide();
        }
    }

    private onHashChange(event: HashChangeEvent) {
        if (this.props.isActive) {
            
        } else {

        }
    }

    public render() {
        let sideShow: string = this.state.showSide ? "d-block" : "d-none";

        return (
            <React.Fragment>
                <header styleName="header"
                    className="px-2 px-sm-3 px-md-4 shadow">
                    <span
                        onClick={this.toggleSide}
                        className="fa fa-align-justify fa-lg p-2"></span>
                    <h1 className="lead d-inline px-4">{this.props.brand}</h1>
                </header>
                <div onClick={this.toggleSide}
                    style={{ opacity: this.state.sideOpacity }}
                    styleName="side"
                    className={sideShow}>
                    <div onClick={event => event.stopPropagation()}
                        styleName="panel"
                        className="shadow"
                        style={{
                            left: this.state.sideOffset + "%",
                            width: this.state.sideWidth + "%"
                        }}>
                        {this.props.children}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export {
    SideMenu
}