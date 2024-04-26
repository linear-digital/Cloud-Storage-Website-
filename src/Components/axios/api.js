import axios from "axios";
import Cookie from 'js-cookie';

export const api = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        "Content-Type": "application/json",
        'token': Cookie.get('authToken')
    },
});

