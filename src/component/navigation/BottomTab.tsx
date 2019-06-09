
import * as React from 'react'
import './bottom_tab.css'

interface BottomTabProps {
    tabs?: Array<{ icon: React.ReactNode, text: string, onClick: React.MouseEvent<HTMLElement, MouseEvent> }>
    children: React.ReactNode[];
}

class BottomTab extends React.Component<BottomTabProps> {
    props: BottomTabProps;
    render() {
        return (
            <div styleName="bottom" className="container-fluid">
                <div className="row">

                    {this.props.children.map((m, i, a) => {
                        let className: string = "";
                        if (!i) {
                            let mod: number = 12 % a.length;
                            if (mod) {
                                className += "offset-" + (mod / 2) + " ";
                            }
                        }
                        let width = a.length >= 12 ? 1 : 12 / a.length;
                        className += "col-" + width;
                        return (
                            <div key={i} className={className} styleName="tab">
                                {m}
                            </div>
                        );
                    })}
                </div>

            </div>
        );
    }
}

export {
    BottomTab
}