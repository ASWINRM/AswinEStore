import express from 'express'
import products from './products.js'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from '../database/db.js'
import Productsroute from '../route/productsroute.js'
import Userrouter from '../route/userroute.js'
import Orderroutes from '../route/Orderroutes.js'
import Wishlistroute from '../route/Wishlistroute.js'
import UploadRoute from '../route/UploadRoute.js'
import morgan from 'morgan'
import path from 'path'
dotenv.config();
const app = express()

const __dirname = path.resolve()
app.use(cors())
app.use(express.json())

connectDB() 



app.use('/api/products', Productsroute)
app.use('/api/user', Userrouter)
app.use('/api/order', Orderroutes)
app.use('/api/wishlist', Wishlistroute)
app.use('/api/uploads', UploadRoute)
app.use('/images', express.static(path.join(__dirname, 'images')))


// if (process.env.NODE_ENV === "development;") {
//     console.log("development");
//     app.use(morgan('dev'))
// }

// if (process.env.NODE_ENV ==="production;") {
//     console.log("In production");
//     // establishing the path from current working directory to frontend build
//     app.use(express.static(path.join(__dirname, '/frontend/build')))

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "/frontend", "/build", "/index.html"))
//     })
// } else {
//     console.log("in else");
//     app.get("/", (req, res) => {
//         res.send("API is Running")
//     })
// }

const PORT=process.env.PORT.trim()||5000

const server = app.listen(PORT, (req, res) => {
    console.log(process.env.NODE_ENV)
    console.log("Server is running on the port"+process.env.PORT);
})
app.get('/',(req, res)=>{
    res.status(200).send("API is running")
})
process.on('unhandledRejection', (err, Promise) => {
    console.log("logged error " + err)
    server.close(() => process.exit(1))
})
