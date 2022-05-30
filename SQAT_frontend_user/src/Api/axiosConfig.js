import axios from "axios"

const baseURL = "https://e909-197-156-118-253.eu.ngrok.io"

export const getToken = () => {
    return (
        localStorage.getItem("token") ? localStorage.getItem("token") : ""
    )
}

const instance = axios.create({
    baseURL: baseURL
});

export default instance;