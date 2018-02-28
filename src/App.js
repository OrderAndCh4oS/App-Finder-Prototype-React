import React, { Component } from 'react';
import Header from './Header';
import Lists from './Lists';

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <Lists/>
            </div>
        );
    }
}

export default App;
