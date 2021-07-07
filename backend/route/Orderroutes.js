import express from 'express'
const router = express.Router()
import asynchandler from 'express-async-handler'
import { authe, admin } from '../middleware/authe.js'
import cors from 'cors'
import sendemail from '../utils/sendemail.js'
import Order from '../database/model/orderschema.js'
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51J4RCvSIuzvapgCaY1eD57fgBkfguDf3y1zBvrf92xn6LQg3rDqUQTl31dOV28pJLtG6nknVmQobeT3faFgeGeT600jCocvMaL');
router.post('/placement', authe, asynchandler(async (req, res) => {


    const {
        Orderitems,
        shippingAddress,
        PaymentMethod,
        TotalShippingprice,
        TotalTaxPrice,
        TotalPrice
    } = req.body

    if (Orderitems && Orderitems.length == 0) {
        res.status(401).send("There is No Order items")
    }
    else {
        const order = await Order.create({

            user: req.user._id,
            orderItems: Orderitems,
            Shippingaddres: shippingAddress,
            paymentmethod: PaymentMethod,
            taxprice: TotalTaxPrice,
            shippingprice: TotalShippingprice,
            Totalprice: TotalPrice,
            paymentresult: "",
            paidAT: null,
            deliveredAT: null


        })

        const createorder = await order.save()

        if (createorder) {
            res.status(200).send(createorder)
        }

    }


}))

router.post('/orderDetails/:id', authe, asynchandler(async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const order = await Order.findById(req.params.id).populate("user", "name email")

        if (order) {
            console.log("ORDER FOUND")
            res.status(200).send(order)
        } else {
            res.status(401).send("order not found")
        }
    } catch (e) {
        res.status(401).send(e)
    }

}))

router.post('/return/:id', asynchandler(async (req, res) => {
    try {
        const id = req.params.id
        const { name } = req.body
        console.log(name)
        console.log("IN RETURN FEATURE")
        const order = await Order.findById(id)

        const { orderItems } = order

        if (orderItems) {
            console.log("RETURN ORDER FOUND")
            orderItems.map(async (item) => {
                console.log(item.name.toLowerCase().trim() + "  -  " + name.trim())


                if (item.name.toLowerCase().trim() == name.trim()) {

                    console.log("RETURN ITEM MATCHED")
                    item.return = true
                    console.log(item.return)
                    await order.save()
                    return res.status(200).send("true")
                }
            })
        }
    } catch (e) {
        res.status(401).send(e)
    }
}))

router.post('/pay', asynchandler(async (req, res) => {
    try {

        const { name, price, token } = req.body
        if (token) {
            console.log(token)
        }
        const transactionKey = uuidv4()
        return stripe.customers.create({
            email: token.email,
            source: token.id
        }).then((customer) => {
            stripe.charges.create({
                amount: price,
                currency: "INR",
                customer: customer.id,
                receipt_email: token.email,
                description: name
            }).then((result) => {
                console.log(result)
                res.status(200).send(result)
            })
        }).catch((e) => {
            console.log(e)
            res.status(401).send(e)
        })




    } catch (e) {
        res.status(401).send(e)
    }
}))



router.post('/orderDetails/paid/:id', asynchandler(async (req, res) => {
    const id = req.params.id
    const order = await Order.findById(req.params.id).populate("user", "name email")

    if (order) {

        order.isPaid = true
        order.paidAT = Date.now()
        const updateorder = await order.save()

    } else {
        res.status(404).send("Order not Found")

    }

    const updatedorder = await Order.findById(req.params.id).populate("user", "name email")

    if (updatedorder) {
        const {
            _id, Shippingaddres, orderItems, paymentmethod, taxprice, shippingprice,
            Totalprice, paidAT, isPaid
        } = updatedorder


        const { name, email } = req.body
        const message = `<div>
           <h1> ORDER ID :${_id}</h1>
           <div>
               Name:${name}
               Email : ${email}
               Address:<p><strong>${Shippingaddres.address},${Shippingaddres.city},
                                  ${Shippingaddres.postalcode},${Shippingaddres.country}</strong>
                        </p>
           </div>
           <div>
              <strong>NO.OF.ITEMS :</strong><p>${orderItems.length}</p>
           </div>
           <div>
              <strong>${orderItems}</strong>
               <p>Amount : ${Totalprice}</p>
           </div>
           <div>
               <strong>Payment Method : </strong><p>${paymentmethod}</p>
               <strong>TotalPrice :</strong><p>${Totalprice}</p>
               <strong>Shipping Price :</strong><p>${shippingprice}</p>
               <strong>TaxPrice :</strong><p>${taxprice}</p>
               <strog>Status :</strog><p>${isPaid ? true : false}</p>
               <strong>Paid At :</strong><p>${paidAT}</p>
               <p>It will be delivered within 3 days</p>
           </div>
           <div>
               <h1>Aswin-EStore</h1>
               <h4>mail : aswinestroe@gmail.com</h4>
               <h4>contact : 7868914174</h4>
           </div>
           </div>
                          `
        try {
            sendemail({
                to: email,
                subject: "Mail for your Order",
                message: message
            })
            res.status(200).send({ success: "The Order email has sent successfully" })
        } catch (e) {
            res.status(401).send("email could'nt send")
        }
    }
}))


router.get('/myorders', authe, asynchandler(async (req, res) => {

    try {
        const orders = await Order.find({ user: req.user._id })

        if (orders) {
            res.status(200).send(orders)
        }
    } catch (e) {
        res.status(401).send(e)
    }

}))

router.post('/orders', asynchandler(async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "name")

        if (orders) {
            res.status(200).send(orders)
        }
    } catch (e) {
        console.log(e)
        res.status(401).send(e)
    }
}))

router.put('/deliver', authe, admin, async (req, res) => {
    try {
        console.log("ORDER DELIVER ")
        const { id } = req.body
        console.log("deliver field " + id)
        const order = await Order.findById(id)
        if (order) {
            order.isdeliverd = true
            order.deliveredAT = Date.now()
            const deliver = await order.save()
            if (deliver) {
                res.status(200).send(order)
            }
        }

    } catch (e) {
        console.log(e)
        res.status(401).send(e)
    }
})

export default router