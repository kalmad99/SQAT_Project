import axios from "axios"

const baseURL = "https://e273-197-156-111-161.eu.ngrok.io"

export const getToken = () => {
    return (
        localStorage.getItem("token") ? localStorage.getItem("token") : ""
    )
}

const instance = axios.create({
    baseURL: baseURL
});

export default instance;