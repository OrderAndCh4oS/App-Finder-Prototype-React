import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './List';
import axios from 'axios';

class App extends Component {
    state = {
        industries: [],
        types: [],
        functions: [],
        apps: [],
    };
    setProperties = (x) => {
        x.active = false;
        x.selected = false;
        return x;
    };
    showAppData = (data) => {
        console.log(data);
    };

    constructor() {
        super();
        this.filterTypes = this.filterTypes.bind(this);
        this.filterFunctions = this.filterFunctions.bind(this);
        this.filterApps = this.filterApps.bind(this);
    }

    async componentDidMount() {
        const industries = await axios.get(
            'http://localhost:3000/data/industry.json');
        const types = await axios.get('http://localhost:3000/data/type.json');
        const functions = await axios.get(
            'http://localhost:3000/data/function.json');
        const adhesion = await axios.get(
            'http://localhost:3000/data/adhesion.json');
        const coatings = await axios.get(
            'http://localhost:3000/data/coatings.json');
        const solubility = await axios.get(
            'http://localhost:3000/data/solubility.json');
        const surfactants = await axios.get(
            'http://localhost:3000/data/surfactants.json');
        const apps = [
            ...adhesion.data,
            ...coatings.data,
            ...solubility.data,
            ...surfactants.data,
        ];
        this.setState({
            industries: industries.data.map((x) => {
                x.active = true;
                x.selected = false;
                return x;
            }),
            types: types.data.map(this.setProperties),
            functions: functions.data.map(this.setProperties),
            apps: apps.map(this.setProperties),
        });
    }

    renderLists(listType, filter) {
        let list = null;
        if(typeof listType === 'undefined') {
            list = <div>Loading...</div>;
        } else {
            const filteredList = listType.filter((l) => l.active);
            list = filteredList.map(this.setList(filter));
        }
        return list;
    };

    setList(filter) {
        return list =>
            <div key={list.id}>
                <List list={list} filterList={filter}/>
            </div>;
    };

    filterTypes(data) {
        this.setState((prevState) => ({
            industries: prevState.industries.map((x) => {
                x.selected = data.id === x.id;
                return x;
            }),
            types: prevState.types.map(
                (x) => {
                    x.selected = false;
                    x.active = data.types.includes(x.id);
                    return x;
                }),
            functions: prevState.functions.map(this.setProperties),
            apps: prevState.apps.map(this.setProperties),
        }));
    }

    filterFunctions(data) {
        this.setState((prevState) => ({
            industries: prevState.industries,
            types: prevState.types.map((x) => {
                x.selected = data.id === x.id;
                return x;
            }),
            functions: prevState.functions.map(
                (x) => {
                    x.selected = false;
                    x.active = data.functions.includes(x.id);
                    return x;
                }),
            apps: prevState.apps.map(this.setProperties),
        }));
    };

    filterApps(data) {
        this.setState((prevState) => ({
            industries: prevState.industries,
            types: prevState.types,
            functions: prevState.functions.map((x) => {
                x.selected = data.id === x.id;
                return x;
            }),
            apps: prevState.apps.map(
                (x) => {
                    x.selected = false;
                    x.active = data.apps.includes(x.id);
                    return x;
                },
            ),
        }));
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">App Finder</h1>
                </header>
                <div className="flex mt3">
                    <div className="pb1 w-25">
                        {this.renderLists(this.state.industries,
                            this.filterTypes)}
                    </div>
                    <div className="pb1 w-25">
                        {this.renderLists(this.state.types,
                            this.filterFunctions)}
                    </div>
                    <div className="pb1 w-25">
                        {this.renderLists(this.state.functions,
                            this.filterApps)}
                    </div>
                    <div className="pb1 w-25">
                        {this.renderLists(this.state.apps, this.showAppData)}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
