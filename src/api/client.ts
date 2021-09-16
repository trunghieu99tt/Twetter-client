import axios from "axios";

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};
const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers,
});

client.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem("accessToken");

        if (token && token.length > 3) {
            if (token[0] === '"') {
                token = token?.substring(1, token.length - 1);
            }
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        console.log(`error`, error);
        return Promise.reject(error);
    }
);

export default client;
