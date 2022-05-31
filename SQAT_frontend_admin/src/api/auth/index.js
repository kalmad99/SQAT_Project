import axios from ".."


export const login = async (email, password) => {
    try {
        const { data: result } = await axios.post("/login/admin", { email, password })
        localStorage.setItem("token", result.token)
        return result;
    } catch (error) {
        console.log(error)
        throw new Error("Invalid Email or Password")
    }
}

export const logout = () => {
    localStorage.removeItem("token")
} 