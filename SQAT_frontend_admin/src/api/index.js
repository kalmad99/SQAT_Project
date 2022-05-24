import axios from "axios"

const baseURL = "http://Localhost:8080/"

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