import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'd7c0b6b8f7d44dbd8122f074803d0581'
    }
})