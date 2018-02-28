import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import './List.css';

export default class List extends Component {
    state = {
        hovered: false,
    };

    setHovered = (isHovered, e) => {
        this.setState({
            hovered: isHovered,
        });
        if(isHovered)
            e.target.focus();
    };

    delaySelect = () => {
        return debounce(() => {
            if(this.state.hovered) {
                this.props.filterList(this.props.list);
            }
        }, 400);
    };

    handleClick = () => {
        if(this.props.list.url) {
            window.open('http://stevenabbott.co.uk' +
                this.props.list.url, '_blank');
        }
    };

    render() {
        return (
            <div>
                <button onMouseLeave={(e) => this.setHovered(false, e)}
                        onMouseEnter={(e) => this.setHovered(true, e)}
                        onMouseOver={this.delaySelect()} onKeyDown={(e) => {
                    if(e.which === 13 || e.which === 32) {
                        this.props.filterList(this.props.list);
                    }
                }} onClick={this.handleClick} className={
                    'delay bg-black white b--black pointer hover-bg-blue bn mb1 pa3 pr4 pl4 f4 db w-90 dib tl'
                    + (this.props.list.selected ? ' selected' : '')
                }>
                    {this.props.list.title}
                </button>
            </div>
        );
    }
}
