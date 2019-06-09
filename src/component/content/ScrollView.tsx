import * as React from 'react'
import * as $ from 'jquery';

interface ScrollViewProps {
    refreshing?: boolean;
    onEndReachedThreshold?: number;
    onRefresh?: () => void;
    onEndReached?: () => void;
    refreshControl?: React.ReactNode;
    ListFooterComponent?: React.ReactNode;
    style?: React.CSSProperties;
}
interface ScrollViewState {
    indicator: { text?: string, y?: number }
}

export class ScrollView extends React.Component<ScrollViewProps, ScrollViewState> {
    private _refs: Map<string, HTMLElement>;
    private _onEndReached: number;
    private mount: boolean = false;
    private _touchStart: { x?: number, y?: number };
    private _touchLast: { x?: number, y?: number };
    private _scroll: { x?: number, y?: number };
    private _scrollTimer: number;

    constructor(props: ScrollViewProps) {
        super(props);
        this._refs = new Map();
        this.state = {
            indicator: { y: -50, text: "下拉刷新" }
        };
        // 默认属性值
        this._onEndReached = props.onEndReachedThreshold || 0.5;
        this._onEndReached++;

        // 滚动位置判断
        this._touchStart = {};
        this._touchLast = {};
        this._scroll = {};
        this._scrollTimer = null;
    }

    componentDidMount() {
        this.mount = true;

        let wrapper = this._refs.get("wrapper");
        if (!wrapper) return;
        let $wrapper = $(wrapper);
        // 上拉加载
        $wrapper.on("touchstart", (e) => {
            let wrapper = this._refs.get("wrapper");
            // 标识新的下拉开始
            this._scroll = null;
            if ($(wrapper).scrollTop() > document.documentElement.clientHeight) return;
            this._scroll = {};

            // 获取触碰起始点与滚动条偏移量
            if (e.touches.length) {
                let touch = e.touches.item(0);
                this._touchStart = { x: touch.clientX, y: touch.clientY };
                this._scroll.y = $(wrapper).scrollTop();
            }
        });

        $wrapper.on("touchmove", (e) => {
            let wrapper = this._refs.get("wrapper");
            if (this._scroll === null || $(wrapper).scrollTop() > document.documentElement.clientHeight) return;

            // 获取最近一次触碰点，设置刷新组件
            if (e.touches.length) {
                let touch = e.touches.item(0);
                this._touchLast = { x: touch.clientX, y: touch.clientY };
                let y = touch.clientY - this._touchStart.y - this._scroll.y - 125;
                this.setState({ indicator: { y: y > 50 ? 50 : y, text: y > 40 ? "松开加载" : "下拉刷新" } })

                if (this._scrollTimer) clearTimeout(this._scrollTimer);
                this._scrollTimer = setTimeout(() => this.setState({ indicator: { y: -50, text: "加载完毕" } }), 1000);
            }
        });

        $wrapper.on("touchend", (e) => {
            let wrapper = this._refs.get("wrapper");
            if (this._scroll === null || $(wrapper).scrollTop() > document.documentElement.clientHeight) return;
            if (this._scrollTimer) clearTimeout(this._scrollTimer);
            // 启用加载
            if (this.state.indicator.y > 40) {
                let indicator = Object.assign({}, this.state.indicator);
                indicator.text = "加载中";
                this.setState({ indicator });
                this.props.onRefresh && this.props.onRefresh();
                setTimeout(() => this.setState({ indicator: { y: -50, text: "加载完毕" } }), 1000);
            }
            else this.setState({ indicator: { y: -50 } })
        });

        // 下拉刷新
        $wrapper.on("scroll", (e: Event) => {
            let wrapper = this._refs.get("wrapper");
            let { scrollTop, scrollHeight, clientHeight } = wrapper;
            if (scrollTop < scrollHeight - clientHeight * this._onEndReached) return;
            // console.log(scrollTop, scrollHeight - clientHeight * this._onEndReached)
            this.props.onEndReached && this.props.onEndReached();
        });
    }

    componentDidUpdate(prevProps: ScrollViewProps, prevState: ScrollViewState, snapshot: any) {
        if (prevProps.refreshing !== this.props.refreshing) {
            let indicator: { y?: number, text?: string } = {};
            if (this.props.refreshing) {
                indicator.y = 50;
                indicator.text = "加载中..."
            }
            else {
                indicator.y = -50;
                indicator.text = "加载完毕"
            }
            this.setState({ indicator });
        }
    }

    render() {
        let { indicator } = this.state;
        return (
            <div ref={el => el && this._refs.set("wrapper", el)} className="x-wrapper" style={this.props.style}>
                <div style={{
                    position: "fixed",
                    top: Number.isNaN(indicator.y) ? 0 : indicator.y,
                    height: 45,
                    overflow: "hidden",
                    transition: "top .3s ease-in-out",
                    zIndex: 999,
                    textAlign: "center",
                    width: "100vw",
                }}>
                    <div style={{ width: 45, height: 45, margin: "auto" }}>
                        {this.props.refreshControl || indicator.text}
                    </div>

                </div>
                <div style={{
                    width: "100%",
                    display: "block"
                }}>
                    {/* 实际内容 */}
                    {this.props.children}
                </div>
                {this.props.ListFooterComponent}
            </div>
        )
    }
}