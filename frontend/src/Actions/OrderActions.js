import {
    ORDER_CREATE_SUCCESS, ORDER_CREATE_REQUEST,
    ORDER_CREATE_FAIL, ORDER_BY_ID_FAIL,
    ORDER_BY_ID_REQUEST, ORDER_BY_ID_SUCCESS,
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL,
    CLIENT_ID, MYORDERS_LIST_FAIL,
    MYORDERS_LIST_SUCCESS, MYORDERS_LIST_REQUEST,
    RETURN_REQUEST, RETURN_SUCCESS, RETURN_FAIL, ORDERS_LIST_REQUEST, ORDERS_LIST_SUCCESS,
    ORDERS_LIST_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL
} from "../constants/constants";
import axios from "axios";
export const orderplacementActions = (order) => async (dispatch, getState) => {

    try {

        dispatch({ type: ORDER_CREATE_REQUEST })
        const { userloginreducer } = getState()
        const { userinfo } = userloginreducer
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const { data } = await axios.post(`http://localhost:5000/api/order/placement`, order, config)

        if (data) {
            dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
        }
    } catch (e) {
        dispatch({ type: ORDER_CREATE_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }
}

export const orderByIdAction = (id) => async (dispatch, getState) => {

    try {

        dispatch({ type: ORDER_BY_ID_REQUEST })

        const { userloginreducer } = getState()
        const { userinfo } = userloginreducer

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const { data } = await axios.post(`http://localhost:5000/api/order/orderDetails/${id}`, config)
        console.log(data)
        if (data) {
            dispatch({ type: ORDER_BY_ID_SUCCESS, payload: data })
        }
    } catch (e) {
        dispatch({ type: ORDER_BY_ID_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }
}

export const orderPaidaction = (id) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST })
    console.log("kadupu masuru")
    try {

        const { userloginreducer } = getState()
        const { userinfo } = userloginreducer
        const { name, email } = userinfo
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post(`http://localhost:5000/api/order/orderDetails/paid/${id}`, { name, email }, config)

        if (data) {
            dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
        }
    } catch (e) {
        dispatch({ type: ORDER_PAY_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }


}

export const Myordersaction = () => async (dispatch, getState) => {

    try {
        dispatch({ type: MYORDERS_LIST_REQUEST })

        const { userloginreducer } = getState()
        const { userinfo } = userloginreducer

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const { data } = await axios.get('http://localhost:5000/api/order/myorders', config)
        if (data) {
            dispatch({ type: MYORDERS_LIST_SUCCESS, payload: data })
        }

    } catch (e) {
        dispatch({ type: MYORDERS_LIST_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }

}

export const ClientIdaction = () => async (dispatch) => {

    const { data } = await axios.get(`http://localhost:5000/api/order/orderDetails/paypal`)

    dispatch({ type: CLIENT_ID, payload: data.ClientId })
}

export const returnaction = (id, name) => async (dispatch) => {
    try {

        dispatch({ type: RETURN_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post(`http://localhost:5000/api/order/return/${id}`, { name: name }, config)
        console.log(data)
        if (data) {
            dispatch({ type: RETURN_SUCCESS, payload: true })
        }
    } catch (e) {
        dispatch({ type: RETURN_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }
}

export const orderslistaction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDERS_LIST_REQUEST })

        const { userloginreducer } = getState()
        const { userinfo } = userloginreducer

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const { data } = await axios.post(`http://localhost:5000/api/order/orders`, config)

        if (data) {
            dispatch({ type: ORDERS_LIST_SUCCESS, payload: data })
        }
    } catch (e) {
        console.log(e)
        dispatch({ type: ORDERS_LIST_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }
}

export const orderdeliveraction = (id) => async (dispatch, getState) => {
    try {

        dispatch({ type: ORDER_DELIVER_REQUEST })
        const { userloginreducer } = getState()
        const { userinfo } = userloginreducer

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const { data } = await axios.put(`http://localhost:5000/api/order/deliver`, { id }, config)
        if (data) {
            dispatch({ type: ORDER_DELIVER_SUCCESS })
        }
    } catch (e) {
        dispatch({ type: ORDER_DELIVER_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }
}