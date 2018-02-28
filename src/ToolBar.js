/**
 * Created by Sarco on 28/02/2018.
 */
import React, { Component } from 'react';

export default class ToolBar extends Component {

    updateInput = (event) => {
        this.props.searchApps(event.target.value);
    };

    render() {
        return (
            <div className="pa3 tc bg-light-gray">
                <input
                    placeholder="Search Apps"
                    className="b--black pa1 sans-serif"
                    onChange={this.updateInput}
                />
            </div>
        );
    }
}