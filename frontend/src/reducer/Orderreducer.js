import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_BY_ID_FAIL,
    ORDER_BY_ID_REQUEST,
    ORDER_BY_ID_SUCCESS,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_RESET,
    ORDER_PAY_REQUEST,
    ORDER_PAY_FAIL,
    CLIENT_ID,
    MYORDERS_LIST_SUCCESS,
    MYORDERS_LIST_REQUEST,
    MYORDERS_LIST_FAIL,
    RETURN_REQUEST,
    RETURN_SUCCESS,
    RETURN_FAIL,
    ORDERS_LIST_REQUEST,
    ORDERS_LIST_SUCCESS,
    ORDERS_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET
} from '../constants/constants'

const initialstate = {
    orderitems: [],
    ShippingAddress: {}
}

export const CreateOrderreducer = (state = initialstate, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return ({ loading: true })
        case ORDER_CREATE_SUCCESS:
            return ({ loading: false, success: true, Order: action.payload })
        case ORDER_CREATE_FAIL:
            return ({ loading: false, error: action.payload })
        default:
            return state
    }
}

export const OrderByIdreducer = (state = initialstate, action) => {
    switch (action.type) {
        case ORDER_BY_ID_REQUEST:
            return ({ loading: true })
        case ORDER_BY_ID_SUCCESS:
            return ({ loading: false, order: action.payload })
        case ORDER_BY_ID_FAIL:
            return ({ loading: false, error: action.payload })
        default:
            return state
    }
}

export const OrderPayreducer = (state = initialstate, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return ({ loading: true })
        case ORDER_PAY_SUCCESS:
            return ({ loading: false, successpay: true, result: action.payload })
        case ORDER_PAY_FAIL:
            return ({ loading: false, error: action.payload })
        case ORDER_PAY_RESET:
            return ({})
        default:
            return state
    }
}

export const MyOrderreducer = (state = initialstate, action) => {
    switch (action.type) {
        case MYORDERS_LIST_REQUEST:
            return ({ loading: true })
        case MYORDERS_LIST_SUCCESS:
            return ({ loading: false, orders: action.payload })
        case MYORDERS_LIST_FAIL:
            return ({ loading: false, error: action.payload })
        default:
            return state
    }
}

export const clientIdreducer = (state = initialstate, action) => {
    switch (action.type) {
        case CLIENT_ID:
            return ({ ClientId: action.payload })
        default:
            return state
    }
}

export const returnreducer = (state = { returned: false }, action) => {
    switch (action.type) {
        case RETURN_REQUEST:
            return ({ loading: true })
        case RETURN_SUCCESS:
            return ({ loading: false, returned: action.payload })
        case RETURN_FAIL:
            return ({ loading: false, error: action.payload })
        default:
            return state
    }
}

export const orderslistreducer = (state = {}, action) => {
    switch (action.type) {
        case ORDERS_LIST_REQUEST:
            return ({ loading: true })
        case ORDERS_LIST_SUCCESS:
            return ({ loading: false, orders: action.payload })
        case ORDERS_LIST_FAIL:
            return ({ loading: false, error: action.payload })

        default:
            return state
    }
}

export const orderdeliverreducer = (state = { deliverdSuccess: false }, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return ({ loading: true })
        case ORDER_DELIVER_SUCCESS:
            return ({ loading: false, deliverdSuccess: true })
        case ORDER_DELIVER_FAIL:
            return ({ loading: false, error: action.payload })
        case ORDER_DELIVER_RESET:
            return ({})
        default:
            return state
    }
}
