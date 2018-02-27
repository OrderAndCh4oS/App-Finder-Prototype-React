import React, {Component} from 'react';

export default class List extends Component {
    filterList = () => {
        this.props.filterHandler();
    };

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <button
                    onClick={this.filterList}
                    className="bg-black white b--black pointer hover-bg-blue bn pa2 pr3 pl3 f4 db w-90 dib tl"
                >
                    {this.props.list.title}
                </button>
            </div>
        );
    }
}
