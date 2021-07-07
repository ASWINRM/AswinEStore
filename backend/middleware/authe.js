import User from '../database/model/Userschema.js'
import jwt from 'jsonwebtoken'
import asynchandler from 'express-async-handler'

export const authe = asynchandler(async (req, res, next) => {

    try {
        console.log("ENTERED AUTH MIDDLEWARE")
        if (req.header('Authorization') && req.header('Authorization').startsWith('Bearer')) {
            console.log("ENTERED AUTH MIDDLEWARE WITH TOKEN")
            const token = req.header('Authorization').replace('Bearer ', '')
            if (!token) {
                return res.status(401).send("Not Authorized to access the token");
            }
            const decoded = jwt.verify(token, "userpasangala")
            if (decoded) {
                console.log("FOUND TOKEN IN AUTH MIDDLEWARE")
                req.user = await User.findById(decoded.id)
            } else {
                console.log("Can't find decoded token")
                console.log(decode)
            }


        }

        next()
    } catch (e) {
        console.log(e)
    }


})

export const admin = async (req, res, next) => {

    if (req.user && req.user.isAdmin) {
        console.log("ADMIN ENTERED")
        next()
    } else {
        return res.status(401).send("The user is not a admin")
    }
}

