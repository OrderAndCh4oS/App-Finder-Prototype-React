import axios from 'axios';

export default class Functions {
    static setProperties = (x) => {
        x.active = false;
        x.selected = false;
        return x;
    };

    static async getData() {
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
        return {
            industries: industries.data.map((x) => {
                x.active = true;
                x.selected = false;
                return x;
            }).sort(Functions.sortByTitle),
            types: types.data.map(Functions.setProperties)
                .sort(Functions.sortByTitle),
            functions: functions.data.map(Functions.setProperties)
                .sort(Functions.sortByTitle),
            apps: apps.map(Functions.setProperties).sort(Functions.sortByTitle),
        };
    }

    static sortByTitle(a, b) {
        if(a.title === 'All') return -1;
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        return 0;
    }
}