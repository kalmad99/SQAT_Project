import axios from "../axiosConfig"
import { useNavigate } from 'react-router-dom'

export const login = async (email, password) => {
    try {
        console.log("login called")
        const { data: result } = await axios.post("/login", { email, password })
        
        if (result.auth) {
            localStorage.setItem("token", result.token)
        }
        return result;
    } catch (error) {
        console.log(error)
        console.log("this for error display checkup")
        throw new Error("Invalid Email or Password")
    }
}

// export const Logout = () => {
//     localStorage.removeItem("token")
//     const navigate = useNavigate()
//     navigate('/')

// }
export const loginWithMagicLink = async (email, link) => {
    try {
        console.log("login called")
        const { data: result } = await axios.post("/login/enter", { email, link })

        console.log("result--", result);
        
        if (result.auth) {
            localStorage.setItem("token", result.token)
        }
        return result;
    } catch (error) {
        console.log(error)
        console.log("this for error display checkup")
        throw new Error("Invalid Email or Password")
    }
}
