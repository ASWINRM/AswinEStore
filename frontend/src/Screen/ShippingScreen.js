import React from 'react';
import Divider from '@material-ui/core/Divider';
import CheckoutStep from '../components/CheckoutStep'
import './Shipping.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shippingaddressaction } from '../Actions/CartActions'

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    var { shippingAddress } = cart
    const [address, setaddress] = useState(shippingAddress ? shippingAddress.address : " ")
    const [city, setcity] = useState(shippingAddress ? shippingAddress.city : " ")
    const [postalcode, setpostalcode] = useState(shippingAddress ? shippingAddress.postalCode : " ")
    const [country, setcountry] = useState(shippingAddress ? shippingAddress.country : " ")



    if (shippingAddress) {
        console.log(shippingAddress)
    }

    const submithandler = (e) => {
        e.preventDefault()
        if (address && city && postalcode && country) {
            dispatch(shippingaddressaction({ address, city, postalcode, country }))
            history.push(`/payment`)
        }

    }
    return (
        <div className="shipping">
            <CheckoutStep step1 step2></CheckoutStep>
            <Divider variant="middle"></Divider>
            <div className="shippingform">
                <h1 >SHIPPING</h1>
                <form action="#">
                    <div className="heading">
                        <h3>Address : </h3>
                    </div>
                    <div className="row">
                        <input type="text" onChange={(e) => setaddress(e.target.value)} placeholder="Address"></input>
                    </div>
                    <div className="heading">
                        <h3>City : </h3>
                    </div>
                    <div className="row">
                        <input type="text" onChange={(e) => setcity(e.target.value)} placeholder="city"></input>
                    </div>
                    <div className="heading" >
                        <h3>Postal Code : </h3>
                    </div>
                    <div className="row">
                        <input type="text" onChange={(e) => setpostalcode(e.target.value)} placeholder="Postal code"></input>
                    </div>
                    <div className="heading">
                        <h3>Country </h3>
                    </div>
                    <div className="row">
                        <input type="text" onChange={(e) => setcountry(e.target.value)} placeholder="Country"></input>
                    </div>
                    <div className="rowbutton">
                        <button onClick={submithandler}>Continue</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ShippingScreen
