// import jwtDecode from "jwt-decode"
// export const loggedin_user = null

import jwtDecode from 'jwt-decode'

// const setLocalStorage = (token) => {
//     localStorage.setItem("token", JSON.stringify(token))
// }

const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token)
    // console.log("token", token, decoded.exp, Date.now() / 1000)
        return decoded.exp > (Date.now() / 1000) ? decoded : ''
}

export const loggedin_user = () => {
    try {
        return getUserFromToken()
    } catch (error) {
        // console.log("error ----", error)
        return null
    }
}
