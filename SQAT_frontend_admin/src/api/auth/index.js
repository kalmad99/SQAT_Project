import axios from ".."


export const login = async (email, password) => {
    try {
        const { data: result } = await axios.post("https://e909-197-156-118-253.eu.ngrok.io/login/admin", { email, password })
        localStorage.setItem("token", result.token)
        return result;
    } catch (error) {
        console.log(error)
        throw new Error("Invalid Email or Password")
    }
}

// export const sendEmail = async (email) => {
//     try {
//         const { data: result } = await axios.post("https://e909-197-156-118-253.eu.ngrok.io/login", { email })
//         localStorage.setItem("token", result.token)
//         return result;
//     } catch (error) {
//         console.log(error)
//         throw new Error("Invalid Email or Password")
//     }
// }

// export const userLogin = async (email, password) => {
//     try {
//         const { data: result } = await axios.post("https://e909-197-156-118-253.eu.ngrok.io/login", { email })
//         localStorage.setItem("token", result.token)
//         return result;
//     } catch (error) {
//         console.log(error)
//         throw new Error("Invalid Email or Password")
//     }
// }