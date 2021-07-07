import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAIL_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_PASSWORD_REQUEST,
    USER_PASSWORD_SUCCESS,
    USER_PASSWORD_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_FAIL,
    GOOGLE_LOGIN_REQUEST,
    EMAIL_SEND_SUCCESS,
    EMAIL_SEND_FAIL,
    EMAIL_SEND_REQUEST,
    CODE_VERIFY_FAIL,
    CODE_VERIFY_SUCCESS,
    CODE_VERIFY_REQUEST,
    USER_RESETPASSWORD_FAIL,
    USER_RESETPASSWORD_SUCCESS,
    USER_RESETPASSWORD_REQUEST,
    USERLIST_REQUEST,
    USERLIST_SUCCESS,
    USERLIST_FAIL,
    USERDELETE_SUCCESS,
    USERDELETE_REQUEST,
    USERDELETE_FAIL

} from '../constants/constants.js'
import axios from 'axios'


export const userloginaction = (email, password) => async (dispatch) => {

    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        console.log(email + " " + password)
        const { data } = await axios.post('http://localhost:5000/api/user/login',
            { email, password }, config)
        console.log(data)
        if (data) {

            dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
        }



    } catch (e) {
        dispatch({ type: USER_LOGIN_FAIL, payload: e.response && e.response.status === 401 ? "Invalid Username or Password" : e.response.status == 404 ? "No user Found ! please Sign up" : e.response.message })
    }

}

export const userlogout = () => (dispatch) => {
    localStorage.removeItem('userinfo');
    dispatch({ type: USER_LOGOUT })
    document.location.href = '/'
}

export const usersignupaction = (name, email, password, tokenId) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        console.log(name + " , " + email + " , " + password)

        axios.post('http://localhost:5000/api/user/signup',
            { name, email, password, tokenId }, config).then((e) => {
                try {

                    console.log(e)
                    const data = e.data
                    console.log(data)
                    if (data) {

                        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
                        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

                    }
                } catch (e) {
                    console.log("dei catch da")
                    dispatch({
                        type: USER_REGISTER_FAIL, payload:
                            e.response && e.response.status === 401 ? "This User is already found, please login!" : e.response.message
                    })

                }

            }).catch((e) => {
                console.log(e.response)
                if (e.response.data === "This User is already found, please login!") {
                    dispatch({
                        type: USER_REGISTER_FAIL, payload:
                            e.response && e.response.status === 401 ? "This User is already found, please login!" : e.response.message
                    })
                }
            })



    } catch (e) {
        console.log(e)
        console.log("dei catch da")
        dispatch({
            type: USER_REGISTER_FAIL, payload:
                e.response && e.response.data ? e.response.data : e.response
        })
    }
}

export const userdetailaction = () => async (dispatch, getState) => {

    try {
        dispatch({ type: USER_DETAIL_REQUEST })

        const { userloginreducer } = getState()

        const userinfo = userloginreducer.userinfo
        if (userinfo.token) {
            console.log("userinfo token found")
        }
        const config = {
            headers: {

                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const { data } = await axios.get("http://localhost:5000/api/user/profile", config)
        console.log("userdetail " + data)
        if (data) {
            dispatch({ type: USER_DETAIL_SUCCESS, payload: data })
        }
    } catch (e) {
        dispatch({ type: USER_DETAIL_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }


}

export const userPasswordCheck = (password) => async (dispatch, getState) => {

    try {
        dispatch({ type: USER_PASSWORD_REQUEST, loading: true })


        const { userloginreducer } = getState()

        const userinfo = userloginreducer.userinfo
        const email = userinfo.email
        console.log(email)

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        if (email && password) {

            const { data } = await axios.post(`http://localhost:5000/api/user/passwordMatch`, { email, password }, config)
            console.log(data)
            if (data === true) {
                dispatch({ type: USER_PASSWORD_SUCCESS, payload: data })
            }
        }

    } catch (e) {
        dispatch({ type: USER_PASSWORD_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }

}

export const userupdateprofileaction = (user) => async (dispatch, getState) => {

    try {
        dispatch({ type: USER_UPDATE_REQUEST, loading: true })
        const { userloginreducer } = getState()
        const { userinfo } = userloginreducer

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const { data } = await axios.put(`http://localhost:5000/api/user/profile`, { user }, config)

        if (data) {
            dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
        }
    } catch (e) {
        dispatch({ type: USER_UPDATE_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }

}

export const googleloginaction = (tokenId, email, name) => async (dispatch) => {

    try {
        dispatch({ type: GOOGLE_LOGIN_REQUEST })
        console.log("USER GOOGLE LOGIN ACTION")
        const config = {
            headers: {
                "Content-Type": "application/json"

            }
        }

        const { data } = await axios.post(`http://localhost:5000/api/user/googlelogin`, { tokenId, email, name }, config)
        if (data) {
            dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: data })
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
        }
    } catch (e) {
        dispatch({ type: GOOGLE_LOGIN_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }

}


export const mailsentdaction = (email) => async (dispatch) => {
    try {
        dispatch({ type: EMAIL_SEND_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json"

            }
        }
        const { data } = await axios.post(`http://localhost:5000/api/user/forgotpassword`, { email }, config)

        if (data) {
            dispatch({ type: EMAIL_SEND_SUCCESS, payload: data })
        }
    } catch (e) {
        dispatch({ type: EMAIL_SEND_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }

}

export const OTPverifiedaction = (sentOTP, EnteredOTP) => async (dispatch) => {

    try {
        dispatch({ type: CODE_VERIFY_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json"

            }
        }

        const { data } = await axios.post(`http://localhost:5000/api/user/verified`, { sentOTP, EnteredOTP }, config)

        if (data) {
            dispatch({ type: CODE_VERIFY_SUCCESS, payload: data })
        }
    } catch (e) {
        dispatch({ type: CODE_VERIFY_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }
}

export const resetpasswordaction = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_RESETPASSWORD_REQUEST })

        const config = {
            headers: {
                "Content-Type": "application/json"

            }
        }

        if (email && password) {
            const { data } = await axios.post(`http://localhost:5000/api/user/resetpassword`, { email, password }, config)

            if (data) {
                dispatch({ type: USER_RESETPASSWORD_SUCCESS, payload: { success: true } })
                dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
                localStorage.setItem('userInfo', JSON.stringify(data))
            }
        }
    } catch (e) {
        dispatch({ type: USER_RESETPASSWORD_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }

}

export const userlistaction = () => async (dispatch, getState) => {

    try {
        dispatch({ type: USERLIST_REQUEST })

        const { userloginreducer } = getState()
        const { userinfo } = userloginreducer

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const { data } = await axios.get(`http://localhost:5000/api/user/admin/userlist`, config)

        if (data) {
            dispatch({ type: USERLIST_SUCCESS, payload: data })
        }
    } catch (e) {
        dispatch({ type: USERLIST_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }
}

export const userdeleteaction = (id) => async (dispatch, getState) => {
    try {

        dispatch({ type: USERDELETE_REQUEST })

        const { userloginreducer } = getState()
        const { userinfo } = userloginreducer

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const { data } = await axios.post(`http://localhost:5000/api/user/admin/delete`, { id }, config)

        if (data) {
            dispatch({ type: USERDELETE_SUCCESS })
        }
    } catch (e) {
        dispatch({ type: USERDELETE_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }
}