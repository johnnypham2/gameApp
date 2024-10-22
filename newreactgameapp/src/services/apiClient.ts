import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
    count: number;
    next: string | null;
    results: T[];
}

const axiosInstance = axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '761779da347047fc8e17ede474332ae4'
    }
})

class APIClient<T> {
    endpoint: string;

    constructor(endpoint:string) {
        this.endpoint = endpoint
    }

    getall(config: AxiosRequestConfig) {
        return axiosInstance
                .get(this.endpoint, config)
                .then(res => res.data)
    }

    // we can add a put

    // we can add a delete
}

export default APIClient;