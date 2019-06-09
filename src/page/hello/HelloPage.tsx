
import * as React from 'react'
import '@style/hello/hello.css'
import { PortalLayout } from '@/component/layout/PortalLayout';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { StateType } from '@/store/reduce';
import { loadHello } from '@/store/action/HelloAction';
// import {App} from '@/App'

interface HelloPageProps extends RouteComponentProps {
    // 开始获取联系人信息
    hello: string;
    loadHello: () => void
}
interface HelloPageState {

}

class HelloPage extends React.Component<HelloPageProps, HelloPageState> {
    render() {
        return (
            <PortalLayout
                title="Hello"
                side={
                    <div style={{ textAlign: "center" }}>
                        侧栏
                    </div>
                }
                navTabs={[
                    { icon: "fas fa-2x fa-address-book", text: "Hello" },
                    { icon: "fas fa-2x fa-envelope", text: "Hello2" },
                ]}
            >
                <React.Fragment>
                    <div styleName="hello">{this.props.hello}</div>
                </React.Fragment>
                <React.Fragment>
                    <div styleName="hello">{this.props.hello}</div>
                </React.Fragment>
            </PortalLayout>
        );
    }
}

const HelloPageWithStore = connect<{ hello: string }, { loadHello: () => {} }, {}, StateType>(
    (state, props) => ({ hello: state.hello.data }),
    (dispatch, props) => ({ loadHello: () => (dispatch as Function)(loadHello()) }),
)(HelloPage);

export {
    HelloPageWithStore as HelloPage
}