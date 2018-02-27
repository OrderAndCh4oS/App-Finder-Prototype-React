import axios from 'axios';

export default class Request {
    instance;

    constructor() {
        let config = {
            baseURL: 'http://localhost:3000/data',
        };
        this.instance = axios.create(config);
    }

    get(endPoint, config) {
        return this.instance.get(endPoint, config);
    }

    getData(endPoint, responseHandler) {
        this.get(endPoint)
            .then(response => {
                responseHandler(response);
            });
    }
}