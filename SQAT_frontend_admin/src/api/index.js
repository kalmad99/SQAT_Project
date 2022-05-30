import axios from "axios"

const baseURL = "https://e909-197-156-118-253.eu.ngrok.io"

const getToken = () => {
    return (

        localStorage.getItem("token") ?
            //  JSON.parse(
            localStorage.getItem("token")
            // )
            : ""
    )
}


const Axios = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${getToken()}`

    }
})

// export const getAllUsers = axios.get(baseURL, { headers: { "Authorization": `Bearer ${getToken()}` } }).then((d) => {
//     return d
// })


export default Axios