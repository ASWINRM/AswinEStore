import React, { useEffect } from 'react'

import Product from '../components/Product'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { CarouselScreen } from './Carousel.js'
import { useDispatch, useSelector } from 'react-redux'
import { listproduct, topproductsaction } from '../Actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const useStyles = makeStyles((theme) => ({

    root: {
        paddingBottom: 10,
        marginTop: 40
    },


}));
const Homescreen = () => {


    const classes = useStyles();


    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const { loading, products, error } = productList
    useEffect(() => {

        // await axios.get('http://localhost:5000/api/products')
        //   .then((res)=>{
        //     const data = res.data
        //     Setproducts(data)
        //   })
        dispatch(listproduct())

    }, [dispatch])

    return (
        <>

            <CarouselScreen></CarouselScreen>
            {loading ? (<Loader></Loader>) : error ? (<Message>{error}</Message>) : (

                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    spacing={3}
                >

                    {console.log(products)}
                    {products && products.map((product) => (
                        <Grid className={classes.root} item xs={12} sm={6} md={4} lg={3} xl={3} key={product._id}>

                            <div className="product" key={product._id}>
                                <Product product={product} key={product._id}></Product>
                            </div>

                        </Grid>
                    ))}

                </Grid>

            )}




        </>

    )
}

export default Homescreen
