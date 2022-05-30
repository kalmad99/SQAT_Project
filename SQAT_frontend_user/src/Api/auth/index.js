import axios from "../axiosConfig"

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
