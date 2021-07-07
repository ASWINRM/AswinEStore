import {
    CART_ADD_ITEMS, CART_FAIL_ITEMS, CART_REMOVE_ITEMS,
    SHIPPING_ADDRESS, PAYMENT_METHOD
} from '../constants/constants'


const initialstate = {
    cartitems: [],
    shippingAddress: {},
    paymentmethod: ""
}

export const Cartreducer = (state = initialstate, action) => {

    switch (action.type) {

        case CART_ADD_ITEMS:
            const item = action.payload
            console.log("actionreducer");
            if (initialstate.cartitems.length >= 1) {

                const existingItem = initialstate.cartitems.find((x) => x.product === item.product)

                if (existingItem) {
                    console.log(typeof (initialstate.cartitems))
                    existingItem.Qty = item.Qty
                    const newitems = initialstate.cartitems.filter((cartitem) => cartitem.product !== item.product)
                    if (newitems.length > 0) {
                        initialstate.cartitems = [...newitems, item]
                    } else {
                        initialstate.cartitems = [item]
                    }

                    return {

                        cartitems: initialstate.cartitems
                    }
                } else {
                    initialstate.cartitems = [...initialstate.cartitems, item]
                    return {
                        ...initialstate,
                        cartitems: initialstate.cartitems,
                    }
                }
            } else {

                initialstate.cartitems = [...initialstate.cartitems, item]
                return {
                    ...initialstate,
                    cartitems: initialstate.cartitems
                }
            }

        case CART_FAIL_ITEMS:
            return ({ error: action.payload })
        case CART_REMOVE_ITEMS:
            initialstate.cartitems = initialstate.cartitems.filter((x) => x.product !== action.payload)
            return {
                ...initialstate.cartitems,
                cartitems: initialstate.cartitems
            }
        case SHIPPING_ADDRESS:
            initialstate.shippingAddress = action.payload
            return {
                ...initialstate,
                shippingAddress: initialstate.shippingAddress
            }

        case PAYMENT_METHOD:
            initialstate.paymentmethod = action.payload
            return {
                ...initialstate,
                paymentmethod: initialstate.paymentmethod
            }

        default:
            return initialstate


    }

}