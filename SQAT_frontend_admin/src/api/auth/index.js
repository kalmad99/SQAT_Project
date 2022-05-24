import axios from ".."


export const login = async (email, password) => {
    try {
        const { data: result } = await axios.post("http://Localhost:8080/auth/admin-login", { email, password })
        localStorage.setItem("token", result.token)
        return result;
    } catch (error) {
        console.log(error)
        throw new Error("Invalid Email or Password")
    }
}


