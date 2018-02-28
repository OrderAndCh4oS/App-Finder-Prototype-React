import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import './List.css';

export default class List extends Component {
    state = {
        timer: null,
    };

    render() {
        return (
            <div>
                <button onMouseOver={
                    debounce(() => {
                        console.log('1');
                        this.props.filterList(this.props.list);
                    }, 200)
                } className={
                    'delay bg-black white b--black pointer hover-bg-blue bn mb1 pa3 pr4 pl4 f4 db w-90 dib tl'
                    + (this.props.list.selected ? ' selected' : '')
                }>
                    {this.props.list.title}
                </button>
            </div>
        );
    }
}
