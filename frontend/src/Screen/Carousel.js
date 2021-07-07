import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { topproductsaction } from '../Actions/productActions'
import './Carousel.css'
import { Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
export const CarouselScreen = () => {


    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(topproductsaction())
    }, [])

    const Topproductsreducer = useSelector(state => state.Topproductsreducer)
    const { topproducts } = Topproductsreducer
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (

        <div>
            {topproducts &&
                <Carousel activeIndex={index} onSelect={handleSelect} className="caros" fade>
                    <Carousel.Item interval={2000} className='carositem'>
                        <div style={{ marginBottom: "50px", marginRight: "1170px", width: "90%", height: "10px", marginTop: "10px" }}>
                            <h3 style={{ color: "white" }}>{topproducts[0].name}</h3>
                            {/* <h5 style={{ color: "white" }}><i className="fas fa-rupee-sign">{topproducts[0].price}</i></h5> */}
                        </div>
                        <img
                            src={topproducts[0].image}
                            alt="first slide"
                            className="d-block w-10 "
                            id='carosimg'
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={2000} className='carositem'>
                        <div style={{ marginBottom: "50px", marginRight: "1170px", width: "90%", height: "10px", marginTop: "10px" }} >
                            <h3 style={{ color: "white" }}>{topproducts[1].name}</h3>
                            {/* <h5 style={{ color: "white" }}><i className="fas fa-rupee-sign">{topproducts[1].price}</i></h5> */}
                        </div>
                        <img
                            src={topproducts[1].image}
                            alt="first slide"
                            className="d-block w-10 "
                            id='carosimg'
                        />

                    </Carousel.Item>
                    <Carousel.Item interval={2000} className='carositem'>
                        <div style={{ marginBottom: "50px", marginRight: "1170px", width: "90%", height: "10px", marginTop: "10px" }}>
                            <h3 style={{ color: "white" }}>{topproducts[2].name}</h3>
                            {/* <h5 style={{ color: "white" }}><i className="fas fa-rupee-sign">{topproducts[2].price}</i></h5> */}
                        </div>
                        <img
                            src={topproducts[2].image}
                            alt="first slide"
                            className="d-block w-10 "
                            id='carosimg'
                        />

                    </Carousel.Item>
                </Carousel>
            }

        </div>

    )
}


