import {
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_LIST_FAIL,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_FAIL,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,
    CREATE_REVIEW_RESET,
    REVIEWS_LIST_REQUEST,
    REVIEWS_LIST_SUCCESS,
    REVIEWS_LIST_FAIL,
    TOP_PRODUCTS_REQUEST,
    TOP_PRODUCTS_SUCCESS,
    TOP_PRODUCTS_FAIL
} from '../constants/constants'
import axios from 'axios'

export const listproduct = () => async (dispatch) => {

    try {
        dispatch({ type: PRODUCTS_LIST_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.get("http://localhost:5000/api/products/", config)
        if (!data) {
            console.log("no data")
            console.log(data)
        }
        if (data) {
            console.log(data)
            dispatch({
                type: PRODUCTS_LIST_SUCCESS,
                payload: data
            })
        }


    } catch (e) {
        console.log(e)
        dispatch({
            type: PRODUCTS_LIST_FAIL,
            payload: e.response && e.response.data ? e.response.data : e.response
        })
    }
}


export const listdetailproduct = (id) => async (dispatch) => {

    try {
        dispatch({ type: PRODUCTS_DETAILS_REQUEST })

        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
        if (!data) {
            console.log("no data")
        }

        dispatch({
            type: PRODUCTS_DETAILS_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: PRODUCTS_DETAILS_FAIL,
            payload: e.response && e.response.data ? e.response.data : e.response
        })
    }
}

export const editproductaction = ({ id, name, price, category, brand, image,
    numReviews, countInstock, rating }) => async (dispatch, getState) => {

        try {

            dispatch({ type: PRODUCT_EDIT_REQUEST })


            const { userloginreducer } = getState()
            const { userinfo } = userloginreducer

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userinfo.token}`
                }
            }

            const { data } = await axios.put(`http://localhost:5000/api/products/edit/product`, {
                id, name, price, image, category, brand, numReviews, rating, countInstock
            }, config)

            if (data) {
                dispatch({ type: PRODUCT_EDIT_SUCCESS })
            }

        } catch (e) {
            dispatch({ type: PRODUCT_EDIT_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
        }
    }

export const creteproductaction = ({ name, price, description, image, category, brand,
    numReviews, rating, countInstock }) => async (dispatch, getState) => {

        try {
            dispatch({ type: PRODUCT_CREATE_REQUEST })

            const { userloginreducer } = getState()
            const { userinfo } = userloginreducer

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userinfo.token}`
                }
            }
            console.log(description)
            const { data } = await axios.put(`http://localhost:5000/api/products/create`, {
                name, price, image, description, category, brand, numReviews, rating, countInstock
            }, config)

            if (data) {
                dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })

            }
        } catch (e) {
            dispatch({ type: PRODUCT_CREATE_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
        }
    }

export const deleteproductaction = (id) => async (dispatch, getState) => {

    try {

        dispatch({ type: PRODUCT_DELETE_REQUEST })

        const { userloginreducer } = getState()
        const { userinfo } = userloginreducer

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const { data } = await axios.post(`http://localhost:5000/api/products/delete`, { id }, config)

        if (data) {
            dispatch({ type: PRODUCT_DELETE_SUCCESS })
        }
    } catch (e) {
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }
}

export const reviewaction = (id, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_REVIEW_REQUEST })

        const { userloginreducer } = getState()
        const { userinfo } = userloginreducer

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const { data } = await axios.post(`http://localhost:5000/api/products/review/${id}`, review, config)
        console.log(data)
        if (data) {
            dispatch({ type: CREATE_REVIEW_SUCCESS })
        }

    } catch (e) {
        console.log(e)
        dispatch({ type: CREATE_REVIEW_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }
}

export const reviewslistaction = (id) => async (dispatch, getState) => {

    try {
        dispatch({ type: REVIEWS_LIST_REQUEST })
        const { userloginreducer } = getState()
        const { userinfo } = userloginreducer

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userinfo.token}`
            }
        }

        const { data } = await axios.get(`http://localhost:5000/api/products/reviews/${id}`, config)
        if (data) {
            dispatch({ type: REVIEWS_LIST_SUCCESS, payload: data })
        }
    } catch (e) {
        dispatch({ type: REVIEWS_LIST_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }
}

export const topproductsaction = () => async (dispatch) => {

    try {
        dispatch({ type: TOP_PRODUCTS_REQUEST })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post(`http://localhost:5000/api/products/topproducts`, config)

        if (data) {
            console.log(data)
            dispatch({ type: TOP_PRODUCTS_SUCCESS, payload: data })
        }

    } catch (e) {
        console.log(e)
        dispatch({ type: TOP_PRODUCTS_FAIL, payload: e.response && e.response.data ? e.response.data : e.response })
    }

}


