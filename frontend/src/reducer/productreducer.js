
import {
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_LIST_FAIL,
    PRODUCTS_DETAILS_FAIL,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_FAIL,
    PRODUCT_EDIT_RESET,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_RESET,
    CREATE_REVIEW_FAIL,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_RESET,
    REVIEWS_LIST_REQUEST,
    REVIEWS_LIST_SUCCESS,
    REVIEWS_LIST_FAIL,
    TOP_PRODUCTS_REQUEST,
    TOP_PRODUCTS_SUCCESS,
    TOP_PRODUCTS_FAIL
} from '../constants/constants'

const intialstate = {
    products: []
}

const intialdetailstate = {
    product: {
        review: []
    }
}

export const productreducer = (state = intialstate, action) => {
    switch (action.type) {
        case PRODUCTS_LIST_REQUEST:
            return ({ loading: true, products: [] })
        case PRODUCTS_LIST_SUCCESS:
            return ({ loading: false, products: action.payload })
        case PRODUCTS_LIST_FAIL:
            return ({ loading: false, error: action.payload })
        default:
            return state
    }
}

export const productDetailreducer = (state = intialdetailstate, action) => {
    switch (action.type) {
        case PRODUCTS_DETAILS_REQUEST:
            return ({ loading: true, product: {} })
        case PRODUCTS_DETAILS_SUCCESS:
            return ({ loading: false, product: action.payload })
        case PRODUCTS_DETAILS_FAIL:
            return ({ loading: false, error: action.payload })
        default:
            return state
    }
}

export const producteditreducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_EDIT_REQUEST:
            return ({ loading: true })
        case PRODUCT_EDIT_SUCCESS:

            return ({ loading: false, successEdit: true })
        case PRODUCT_EDIT_FAIL:
            return ({ loading: false, error: action.payload })
        case PRODUCT_EDIT_RESET:
            return ({})
        default:
            return state
    }
}

export const productcreatereducer = (state = { successCreate: false }, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return ({ loading: true })
        case PRODUCT_CREATE_SUCCESS:
            state.successCreate = true
            return ({ loading: false })
        case PRODUCT_CREATE_FAIL:
            return ({ loading: false, error: action.payload })
        case PRODUCT_CREATE_RESET:
            return ({})
        default:
            return state
    }
}

export const productdeletereducer = (state = { successDelete: false }, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return ({ loading: true })
        case PRODUCT_DELETE_SUCCESS:
            state.successDelete = true
            return ({ loading: false })
        case PRODUCT_DELETE_FAIL:
            return ({ loading: false, error: action.payload })
        case PRODUCT_DELETE_RESET:
            return ({})
        default:
            return state
    }
}

export const Reviewreducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_REVIEW_REQUEST:
            return ({ loadingreview: true })
        case CREATE_REVIEW_SUCCESS:
            return ({ loadingreview: false, successreview: true })
        case CREATE_REVIEW_FAIL:
            return ({ loadingreview: false, errorReview: action.payload })
        case CREATE_REVIEW_RESET:
            return ({})
        default:
            return state
    }

}

export const Reviewslistreducer = (state = {}, action) => {
    switch (action.type) {
        case REVIEWS_LIST_REQUEST:
            return ({ loading: true })
        case REVIEWS_LIST_SUCCESS:
            return ({ loading: false, reviewslist: action.payload })
        case REVIEWS_LIST_FAIL:
            return ({ loading: false, error: action.payload })
        default:
            return state
    }
}

export const Topproductsreducer = (state = {}, action) => {
    switch (action.type) {
        case TOP_PRODUCTS_REQUEST:
            return ({ loading: true })
        case TOP_PRODUCTS_SUCCESS:
            return ({ loading: true, topproducts: action.payload })
        case TOP_PRODUCTS_FAIL:
            return ({ loading: false, error: action.payload })
        default:
            return state
    }
}



