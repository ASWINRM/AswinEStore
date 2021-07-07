import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_DETAIL_FAIL,
    USER_PASSWORD_REQUEST, USER_PASSWORD_SUCCESS, USER_PASSWORD_FAIL,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    GOOGLE_LOGIN_REQUEST, GOOGLE_LOGIN_SUCCESS, GOOGLE_LOGIN_FAIL,
    EMAIL_SEND_REQUEST, EMAIL_SEND_SUCCESS, EMAIL_SEND_FAIL,
    CODE_VERIFY_REQUEST, CODE_VERIFY_SUCCESS, CODE_VERIFY_FAIL,
    USER_RESETPASSWORD_REQUEST, USER_RESETPASSWORD_SUCCESS, USER_RESETPASSWORD_FAIL,
    USERLIST_REQUEST, USERLIST_SUCCESS, USERLIST_FAIL, USERLIST_RESET, USERDELETE_REQUEST, USERDELETE_SUCCESS, USERDELETE_FAIL, USERDELETE_RESET
} from '../constants/constants.js'



export const userloginreducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return ({ loading: true })
        case USER_LOGIN_SUCCESS:
            return ({ loading: false, userinfo: action.payload })
        case USER_LOGIN_FAIL:
            return ({ loading: false, error: action.payload })
        case USER_LOGOUT:
            return {}
        default:
            return state

    }
}

export const usersignupreducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return ({ loading: true })
        case USER_REGISTER_SUCCESS:
            return ({ loading: false, userinfo: action.payload })
        case USER_REGISTER_FAIL:
            return ({ loading: false, error: action.payload })
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userdetailreducer = (state = {}, action) => {
    switch (action.type) {

        case USER_DETAIL_REQUEST:
            return ({ loading: true })
        case USER_DETAIL_SUCCESS:
            return ({ loading: false, userdetail: action.payload })
        case USER_DETAIL_FAIL:
            return ({ loading: false, error: action.payload })
        default:
            return state
    }
}

export const userpasswordcheckreducer = (state = {}, action) => {
    switch (action.type) {

        case USER_PASSWORD_REQUEST:
            return ({ loading: true })
        case USER_PASSWORD_SUCCESS:
            return ({ loading: false, match: action.payload })
        case USER_PASSWORD_FAIL:
            return ({ loading: false, error: action.payload })
        default:
            return state
    }
}

export const userupdateprofilereducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return ({ loading: true })
        case USER_UPDATE_SUCCESS:
            return ({ loading: false, success: action.payload })
        case USER_UPDATE_FAIL:
            return ({ loading: false, failed: action.payload })
        default:
            return state
    }
}

export const googleloginreducer = (state = {}, action) => {
    switch (action.type) {
        case GOOGLE_LOGIN_REQUEST:
            return ({ loading: true })
        case GOOGLE_LOGIN_SUCCESS:
            return ({ loading: false, googleuser: action.payload })
        case GOOGLE_LOGIN_FAIL:
            return ({ loading: false, googleerror: action.payload })
        default:
            return state
    }
}

export const emailsentreducer = (state = {}, action) => {
    switch (action.type) {
        case EMAIL_SEND_REQUEST:
            return ({ loading: true })
        case EMAIL_SEND_SUCCESS:
            return ({ loading: false, mailsent: action.payload })
        case EMAIL_SEND_FAIL:
            return ({ loading: false, error: action.payload })
        default:
            return state
    }
}

export const verifyOTPactionreducer = (state = {}, action) => {
    switch (action.type) {
        case CODE_VERIFY_REQUEST:
            return ({ loading: true })
        case CODE_VERIFY_SUCCESS:
            return ({ loading: false, verified: action.payload })
        case CODE_VERIFY_FAIL:
            return ({ loading: false, verifyerror: action.payload })
        default:
            return state
    }
}

export const resetpasswordreducer = (state = {}, action) => {
    switch (action.type) {
        case USER_RESETPASSWORD_REQUEST:
            return ({ loading: true })
        case USER_RESETPASSWORD_SUCCESS:
            return ({ loading: false, reset: action.payload })
        case USER_RESETPASSWORD_FAIL:
            return ({ loading: false, reseterror: action.payload })
        default:
            return state
    }
}

export const userlistreducer = (state = {}, action) => {
    switch (action.type) {
        case USERLIST_REQUEST:
            return ({ loading: true })
        case USERLIST_SUCCESS:
            return ({ loading: false, userlist: action.payload })
        case USERLIST_FAIL:
            return ({ loading: false, error: action.payload })
        case USERLIST_RESET:
            return ({})
        default:
            return state
    }
}

export const userdeletereducer = (state = {}, action) => {
    switch (action.type) {
        case USERDELETE_REQUEST:
            return ({ loading: true })
        case USERDELETE_SUCCESS:
            return ({ loading: false, successDelete: true })
        case USERDELETE_FAIL:
            return ({ loading: false, error: action.payload })
        case USERDELETE_RESET:
            return ({})
        default:
            return state
    }
}