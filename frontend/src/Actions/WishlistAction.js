

import {
    WISHLIST_ADD_REQUEST, WISHLIST_ADD_SUCCESS,
    WISHLIST_ADD_FAIL, WISHLIST_REMOVE_REQUEST, WISHLIST_REMOVE_FAIL,
    WISHLIST_REMOVE_SUCCESS
} from '../constants/constants'
import axios from 'axios'
export const addwishaction = (product) => async (dispatch, getState) => {

    try {
        const { userloginreducer } = getState()

        const userinfo = userloginreducer.userinfo

        console.log("wishlist action")
        dispatch({ type: WISHLIST_ADD_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const { data } = await axios.post(`https://aswinestoreww.herokuapp.com/api/wishlist/add`, product, config)

        if (data) {
            dispatch({ type: WISHLIST_ADD_SUCCESS, payload: data })
        }
    } catch (e) {
        dispatch({ type: WISHLIST_ADD_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }



}


export const removewishaction = (product) => async (dispatch) => {

    try {
        dispatch({ type: WISHLIST_REMOVE_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post(`https://aswinestoreww.herokuapp.com/api/wishlist/remove`, product, config)

        if (data) {
            dispatch({ type: WISHLIST_REMOVE_SUCCESS, payload: data })
        }
    } catch (e) {
        dispatch({ type: WISHLIST_REMOVE_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }


}

