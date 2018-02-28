import axios from 'axios';

export default class Functions {
    static setProperties = (item) => {
        item.active = false;
        item.selected = false;
        return item;
    };

    static async getData() {
        const industries = await axios.get(
            '/data/industry.json');
        const types = await axios.get('/data/type.json');
        const functions = await axios.get(
            '/data/function.json');
        const adhesion = await axios.get(
            '/data/adhesion.json');
        const coatings = await axios.get(
            '/data/coatings.json');
        const solubility = await axios.get(
            '/data/solubility.json');
        const surfactants = await axios.get(
            '/data/surfactants.json');
        const apps = [
            ...adhesion.data,
            ...coatings.data,
            ...solubility.data,
            ...surfactants.data,
        ];
        const data = {
            industries: industries.data,
            types: types.data,
            functions: functions.data,
            apps: apps,
        };
        return this.initialState(data);
    }

    static initialState(data) {
        return {
            industries: data.industries.map((industry) => {
                industry.active = true;
                industry.selected = false;
                return industry;
            }).sort(Functions.sortByTitle),
            types: data.types.map(Functions.setProperties)
                .sort(Functions.sortByTitle),
            functions: data.functions.map(Functions.setProperties)
                .sort(Functions.sortByTitle),
            apps: data.apps.map(Functions.setProperties)
                .sort(Functions.sortByTitle),
        };
    }

    static sortByTitle(a, b) {
        if(a.title === 'All') return -1;
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        return 0;
    }
}