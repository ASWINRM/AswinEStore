import React from 'react'
import './wishlist.css'
import { Link } from 'react-router-dom';

import { Image, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { Message } from '../components/Message';

const WishlistScreen = ({ history }) => {

    const wishlistreducer = useSelector(state => state.wishlistreducer)
    const { wishlistitems } = wishlistreducer
    const productList = useSelector(state => state.productList)
    const { products } = productList

    const addCartHandler = (item) => {
        products.map((product) => {
            if (product.name === item.name) {
                history.push(`/cart/${product._id}?qty=1`)
            }
        })
    }

    const viewproduct = (item) => {
        products.map((product) => {
            if (product.name === item.name) {
                history.push(`/product/${product._id}`)
            }
        })
    }

    return (
        <div >
            <div>
                <Link to='/' className="btn btn-dark my-3">
                    GO BACK
                </Link>
            </div>
            <div className="container my-3">
                <div className="row rows" style={{ width: "100%" }}>

                    {

                        (wishlistitems && wishlistitems.length > 0) ? wishlistitems.map((item) =>

                            <div className="col-12 col-md-3 " key={item.id}>
                                <div className="card mb-4 cont">
                                    <Image src={item.image} alt="imagename" className="card-img-top image"></Image>
                                    <div className="card-body ">
                                        <h3 className="card-title">{item.name}</h3>
                                        <Rating value={item.rating}></Rating>
                                        <h2><i className="fas fa-rupee-sign">{item.price}</i></h2>

                                    </div>
                                    <div>
                                        <Button className="btn btn-dark my-3 btn-block " id="bton"
                                            onClick={() => addCartHandler(item)}>Add to Cart</Button>
                                        <Button className="btn btn-dark my-3 btn-block bton" id="bton"
                                            onClick={() => viewproduct(item)}>View Product</Button>
                                    </div>
                                </div>
                            </div>

                        ) : <Message>Your WishList is Empty !<Link to='/'>Go Back</Link> </Message>

                    }
                </div>
            </div>


        </div>
    )
}

export default WishlistScreen
