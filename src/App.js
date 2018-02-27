import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import List from './List';
import axios from 'axios';

class App extends Component {
    state = {
        industries: [],
        types: [],
        functions: [],
        apps: []
    };

    constructor() {
        super();
        this.filterLists = this.filterLists.bind(this);
    }

    async componentDidMount() {
        const industries = await axios.get('http://localhost:3000/data/industry.json');
        const types = await axios.get('http://localhost:3000/data/type.json');
        const functions = await axios.get('http://localhost:3000/data/function.json');
        const adhesion = await axios.get('http://localhost:3000/data/adhesion.json');
        const coatings = await axios.get('http://localhost:3000/data/coatings.json');
        const solubility = await axios.get('http://localhost:3000/data/solubility.json');
        const surfactants = await axios.get('http://localhost:3000/data/surfactants.json');
        const apps = [...adhesion.data, ...coatings.data, ...solubility.data, ...surfactants.data];
        this.setState({
            industries: industries.data.map((i) => {
                i.active = true;
                return i;
            }),
            types: types.data.map((t) => {
                t.active = false;
                return t;
            }),
            functions: functions.data.map((f) => {
                f.active = false;
                return f;
            }),
            apps: apps.map((a) => {
                a.active = false;
                return a;
            })
        });
    }

    renderLists(listType) {
        let list = null;
        if (typeof listType === 'undefined') {
            list = <div>Loading...</div>;
        } else {
            const filteredList = listType.filter((l) => l.active);
            list = filteredList.map(this.setList());
        }
        return list;
    }

    setList() {
        return list =>
            <div key={list.id}>
                <List list={list} filterHandler={this.filterLists}/>
            </div>;
    }

    filterLists(data, e) {
        console.log(data);
        this.setState((prevState) => ({
            industries: prevState.industries,
            types: prevState.types,
            functions: prevState.functions,
            apps: prevState.apps
        }));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">App Finder</h1>
                </header>
                <div className="flex">
                    <div className="pb1 w-25">
                        {this.renderLists(this.state.industries)}
                    </div>
                    <div className="pb1 w-25">
                        {this.renderLists(this.state.types)}
                    </div>
                    <div className="pb1 w-25">
                        {this.renderLists(this.state.functions)}
                    </div>
                    <div className="pb1 w-25">
                        {this.renderLists(this.state.apps)}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
