
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
    productreducer, productDetailreducer, producteditreducer,
    productcreatereducer, productdeletereducer, Reviewreducer,
    Reviewslistreducer, Topproductsreducer
} from '../reducer/productreducer'
import { Cartreducer } from '../reducer/Cartreducer'
import {
    userloginreducer, usersignupreducer, userdetailreducer,
    userpasswordcheckreducer, userupdateprofilereducer,
    emailsentreducer, verifyOTPactionreducer,
    resetpasswordreducer, userlistreducer, userdeletereducer
} from '../reducer/userreducer'
import {
    CreateOrderreducer, OrderByIdreducer, OrderPayreducer,
    clientIdreducer, MyOrderreducer, returnreducer, orderslistreducer,
    orderdeliverreducer
} from '../reducer/Orderreducer'
import { wishlistreducer } from '../reducer/Wishlistreducer'
const reducers = combineReducers({
    productList: productreducer,
    productDetailList: productDetailreducer,
    cart: Cartreducer,
    userloginreducer: userloginreducer,
    usersignupreducer: usersignupreducer,
    userdetailreducer: userdetailreducer,
    userpasswordcheckreducer: userpasswordcheckreducer,
    userupdateprofilereducer: userupdateprofilereducer,
    emailsentreducer: emailsentreducer,
    verifyOTPactionreducer: verifyOTPactionreducer,
    resetpasswordreducer: resetpasswordreducer,
    CreateOrderreducer: CreateOrderreducer,
    OrderByIdreducer: OrderByIdreducer,
    OrderPayreducer: OrderPayreducer,
    clientIdreducer: clientIdreducer,
    wishlistreducer: wishlistreducer,
    MyOrderreducer: MyOrderreducer,
    returnreducer: returnreducer,
    userlistreducer: userlistreducer,
    userdeletereducer: userdeletereducer,
    producteditreducer: producteditreducer,
    productcreatereducer: productcreatereducer,
    productdeletereducer: productdeletereducer,
    orderslistreducer: orderslistreducer,
    orderdeliverreducer: orderdeliverreducer,
    Reviewreducer: Reviewreducer,
    Reviewslistreducer: Reviewslistreducer,
    Topproductsreducer: Topproductsreducer
})

const cartitemsfromstorage = localStorage.getItem('cartitems') ? JSON.parse(
    localStorage.getItem('cartitems')
) : [];

// const userlogininfo = localStorage.getItem('userInfo') ?
//     localStorage.getItem('userInfo')
//     : "";
const ShippingAddress = localStorage.getItem('ShippingAddress') ? JSON.parse(
    localStorage.getItem('ShippingAddress')
) : {};



console.log(localStorage.getItem('cartitems'))
const intialstate = {
    cart: {
        cartItems: cartitemsfromstorage,
        ShippingAddress: ShippingAddress,
    },



}
const middleware = [thunk]


const store = createStore(reducers, intialstate, composeWithDevTools(applyMiddleware(...middleware)))

export default store
