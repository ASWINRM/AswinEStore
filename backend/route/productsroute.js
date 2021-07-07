import express from 'express'
const router = express.Router()
import asynchandler from 'express-async-handler'
import Product from '../database/model/Productschema.js'
import { authe, admin } from '../middleware/authe.js'

router.get('/', asynchandler(async (req, res) => {
    try {
        console.log("AllProduct")
        const products = await Product.find({})
        if (products) {
            console.log(products)
            return res.status(200).send(products)
        } else {
            return res.status(404).send("could not found products")
        }
    } catch (e) {
        console.log(e)
        res.send(e)
    }


}))

router.get('/:id', asynchandler(async (req, res) => {
    try {
        console.log("productById")
        const product = await Product.findById({ _id: req.params.id })
        if (product) {
            return res.send(product)
        } else {
            return res.status(404).send("could not found the  product")
        }
    } catch (e) {
        return res.send(e)
    }


}))

router.put('/edit/product', authe, admin, asynchandler(async (req, res) => {

    try {
        const {
            id,
            name,
            price,
            category,
            rating,
            numReviews,
            image,
            brand,
            countInstock,
            description
        } = req.body
        console.log(name)
        const product = await Product.findById(id)

        if (product) {
            product.name = name || product.price,
                product.price = price || product.price,
                product.description = description || product.description,
                product.rating = rating || product.rating,
                product.numReviews = numReviews || product.numReviews,
                product.image = image || product.image,
                product.brand = brand || product.brand,
                product.category = category || product.category,
                product.countInstock = countInstock || product.countInstock
            product.user = req.user


            const updateduser = await product.save()
            if (updateduser) {
                res.status(200).send("The product is updated")
            }

        }

    } catch (e) {
        console.log(e)
        res.status(401).send(e)
    }
}))

router.put('/create', authe, admin, async (req, res) => {
    try {
        const {
            name,
            price,
            category,
            rating,
            numReviews,
            image,
            brand,
            countInstock,
            description
        } = req.body
        console.log(description)
        const product = await Product.create({
            rating,
            numReviews,
            countInstock,
            name,
            image,
            description,
            brand,
            category,
            price,
            brandlogo: "/images/shopping-cart-icon.png",
            user: req.user
        })

        const saveproduct = await product.save()

        if (saveproduct) {
            res.status(200).send("the product is created")
        }
    } catch (e) {
        console.log(e)
        res.status(401).send(e)
    }
})

router.post('/delete', authe, admin, asynchandler(async (req, res) => {

    try {
        const { id } = req.body

        const product = await Product.deleteOne({ _id: id })

        if (product) {
            res.status(200).send("the product is deleted")
        }
    } catch (e) {
        console.log(e)
        res.status(401).send(e)
    }

}))

router.post('/review/:id', authe, asynchandler(async (req, res) => {

    try {
        console.log("REVIEW ROUTE")
        const id = req.params.id
        const { rating, comment } = req.body
        const product = await Product.findById(id)
        if (product) {
            console.log("REVIEWABLE PRODUCT")


            const review = product.reviews.push({
                name: req.user.name,
                rating: rating,
                comment: comment,
                user: req.user._id
            })
            if (review) {
                console.log("WE UPDATED THE REVIEW")
                product.numReviews = product.reviews.length
                product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
                await product.save()

                res.status(200).send(product)
            }





        }

    } catch (e) {
        console.log(e)
        res.status(401).send(e)
    }
}))


router.get('reviews/:id', asynchandler(async (req, res) => {
    try {
        console.log("reviews list")
        const id = req.params.id
        const product = await Product.findById(id)
        if (product.reviews >= 1) {
            console.log("reviews there")
            return res.status(200).send(product.reviews)
        } else {
            return res.status(200).send(" ")
        }
    } catch (e) {
        console.log(e)
        res.status(401).send(e)
    }
}))

router.post('/topproducts', asynchandler(async (req, res) => {
    try {
        console.log("top products")
        const products = await Product.find({}).sort({ rating: -1 }).limit(3)
        console.log(products)
        if (products) {
            res.status(200).send(products)
        }
    } catch (e) {
        console.log(e)
        res.status(401).send(e)

    }
}))



export default router