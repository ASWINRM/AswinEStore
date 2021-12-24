import {
    CART_ADD_ITEMS, CART_FAIL_ITEMS, CART_REMOVE_ITEMS,
    PAYMENT_METHOD,
    SHIPPING_ADDRESS
} from '../constants/constants'
import axios from 'axios'

export const cartAddAction = (id, Qty) => async (dispatch, getState) => {
    console.log(CART_ADD_ITEMS)
    const { data } = await axios.get(`https://aswinestoreww.herokuapp.com/api/products/${id}`)
    if (data) {
        data.price = currencyconvertor(data, Qty)
    }
    try {

        dispatch({
            type: CART_ADD_ITEMS,
            payload: {
                product: data._id,
                name: data.name,
                price: data.price,
                image: data.image,
                countInstock: data.countInstock,
                Quantity: Qty,
                shippingprice: 0,
                taxprice: 0
            }
        })
        console.log(getState().cart.cartitems)
        localStorage.setItem('cartitems', JSON.stringify(getState().cart.cartitems))
    } catch (e) {
        console.log(e)
        dispatch({ type: CART_FAIL_ITEMS, payload: e })
    }

}

export const currencyconvertor = (data, Qty) => {
    var res = 0;
    if (data) {
        var tot = "";
        data.price.split(",").map((no) => {
            tot += no
        })
        console.log(Number(tot))
        var total = Number(tot) * Qty
        console.log(total)
        var totalstr = total.toString();

        var afterdot = ""
        if (totalstr.indexOf('.') > 0) {
            afterdot = totalstr.substring(totalstr.indexof('.'), totalstr.length)

        }
        total = Math.floor(total)
        var totalstr2 = total.toString()
        var lastthree = totalstr.substring(totalstr2.length - 3)
        var othernumbers = totalstr.substring(0, totalstr2.length - 3)
        if (othernumbers !== "") {
            lastthree = ',' + lastthree;
            res = othernumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastthree + afterdot;

        }

        return res;
    } else {
        return res;
    }
}

export const currencytoAmount = (data) => {
    var amount = ""
    data.price.split(",").map((price) => {
        amount += price
    })
    return Number(amount)
}

export const currencyprice = (price) => {
    var amount = ""
    price.split(",").map((price) => {
        amount += price
    })
    return Math.floor(Number(amount))
}

export const currencyformatter = (price) => {
    var amount = price.toString()
    var res = ""
    var afterdot = "";
    if (amount.indexOf(".") > 0) {
        afterdot = amount.substring(amount.indexOf("."), amount.length)
    }
    price = Math.floor(price)
    var amount2 = price.toString()
    var lastthree = amount2.substring(amount2.length - 3)
    var othernumbers = amount2.substring(0, amount2.length - 3)
    if (othernumbers !== "") {
        lastthree = "," + lastthree;
        res = othernumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastthree + afterdot;
    }
    return res
}

export const currencytransformer = (price) => {


    var res = ""


    price = Math.floor(price)
    var amount2 = price.toString()
    var lastthree = amount2.substring(amount2.length - 3)
    var othernumbers = amount2.substring(0, amount2.length - 3)
    if (othernumbers !== "") {
        lastthree = "," + lastthree;
        res = othernumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastthree;
    }
    return res
}

export const removeCartItems = (id) => (dispatch, getState) => {
    console.log(id)
    dispatch({ type: CART_REMOVE_ITEMS, payload: id })
    localStorage.setItem('cartitems', JSON.stringify(getState().cart.cartitems))
}

export const shippingaddressaction = (data) => (dispatch) => {
    console.log(data)
    dispatch({ type: SHIPPING_ADDRESS, payload: data })

    localStorage.setItem('ShippingAddress', JSON.stringify(data))
}

export const paymentmethodaction = (data) => (dispatch) => {
    dispatch({ type: PAYMENT_METHOD, payload: data })

    localStorage.setItem("PaymentMethod", JSON.stringify(data))
}