import React, { Component } from 'react';

export default class List extends Component {

    render() {
        return (
            <div>
                <button
                    className="bg-black white b--black pointer hover-bg-blue bn pa2 pr3 pl3 f4 db w-90 dib tl"
                >
                    {this.props.list.title}
                </button>
            </div>
        );
    }
}
