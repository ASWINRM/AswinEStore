import React from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutStep from '../components/CheckoutStep'
import { useEffect, useState } from 'react'
import { paymentmethodaction } from '../Actions/CartActions'
import './FP.css'
const PaymentScreen = ({ history }) => {
    const [PaymentMethod, setPaymentMethod] = useState('creditcard')
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    const userloginreducer = useSelector(state => state.userloginreducer)
    const { userinfo } = userloginreducer
    const dispatch = useDispatch()
    useEffect(() => {
        if (!userinfo) {
            history.push('/login')
        }
        else if (!shippingAddress) {
            history.push('/shipping')
        }
    }, [history, userinfo, shippingAddress])


    const submithandler = (e) => {
        e.preventDefault()

        dispatch(paymentmethodaction(PaymentMethod))
        history.push(`/OrderPlacement`)
    }

    return (
        <div className="paymentcontainer">

            <CheckoutStep step1 step2 step3></CheckoutStep>
            <div className="paydiv">
                <h1>PAYMENT METHOD </h1>
                <form action="#">
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <div >
                        <div style={{ display: "flex", flexDirection: "row", width: "15px", alignItems: "center" }}>
                            <input type="radio" checked="checked" name="radio"
                                onChange={(e) => setPaymentMethod(e.target.value)} value="creditcard" />
                            <label style={{ margin: "2px" }}> CreditCard </label>
                        </div>
                        {/* <div>
                <input type="radio"  name="radio"
                 onChange={(e)=>setPaymentMethod(e.target.value)} value="Stripe"  />
                <label >Stripe </label>  
                </div> */}
                        <button onClick={submithandler} className="paymentbtn">Continue</button>
                    </div>
                </form>
            </div>



        </div>

    )
}

export default PaymentScreen
