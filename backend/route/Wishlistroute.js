import express from 'express'
const router = express.Router()
import asynchandler from 'express-async-handler'
import Product from '../database/model/Productschema.js'
import Wishlist from '../database/model/wishlistSchema.js'
import { authe } from '../middleware/authe.js'
router.post('/add', authe, asynchandler(async (req, res) => {

    try {
        const { name } = req.body
        console.log(name)
        const product = await Product.findOne({ name: name })
        console.log("WISHLIST")
        if (product) {
            console.log("FOUND WISHED PRODUCT")
            console.log(product.name)
            const wishproduct = await Wishlist.create({
                user: req.user._id,
                name: product.name,
                image: product.image,
                brand: product.brand,
                category: product.category,
                rating: product.rating,
                price: product.price
            })

            if (wishproduct) {
                console.log("WISHLIST PRODUCT CREATED")
                res.status(200).send({
                    id: product._id,
                    name: product.name,
                    image: product.image,
                    brand: product.brand,
                    category: product.category,
                    rating: product.rating,
                    price: product.price
                })
            }

        }
    } catch (e) {
        console.log(e)
        res.status(401).send(e)
    }


}))

router.post('/remove', asynchandler(async (req, res) => {

    try {
        const { name } = req.body

        const removeitem = await Wishlist.deleteOne({ name: name })

        res.status(200).send({ name: name, item_removed: true })
    } catch (e) {
        console.log(e)
        res.status(401).send(e)
    }
}))




export default router;