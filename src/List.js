import React, { Component } from 'react';

export default class List extends Component {
    render() {
        return (
            <div>
                <button onMouseOver={() => {
                    this.props.filterList(this.props.list);
                }} className={
                    'bg-black white b--black pointer hover-bg-blue bn mb1 pa3 pr4 pl4 f4 db w-90 dib tl'
                    + (this.props.list.selected ? ' selected' : '')
                }
                >
                    {this.props.list.title}
                </button>
            </div>
        );
    }
}
