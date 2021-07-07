import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { listproduct } from '../Actions/productActions'
import { userlogout } from '../Actions/UserActions'
import { deleteproductaction } from '../Actions/productActions'
import { Loader } from '../components/Loader'
import { PRODUCT_DELETE_RESET, PRODUCT_CREATE_RESET } from '../constants/constants'
const ProductListScreen = ({ history }) => {



    const userloginreducer = useSelector(state => state.userloginreducer)
    const { userinfo } = userloginreducer
    const dispatch = useDispatch()
    const productdeletereducer = useSelector(state => state.productdeletereducer)
    const { successDelete } = productdeletereducer
    useEffect(() => {
        if (!userinfo.isAdmin) {
            dispatch({ type: PRODUCT_DELETE_RESET })
            dispatch({ type: PRODUCT_CREATE_RESET })
            dispatch(userlogout())
            return history.push('/login')
        }
        dispatch(listproduct())
    }, [dispatch, successDelete])
    const productList = useSelector(state => state.productList)
    const { loading, products } = productList

    const deleteproduct = (id) => {
        if (window.confirm("Are you sure to delete this product ?")) {
            dispatch(deleteproductaction(id))
        }

    }



    const CreateProduct = () => {
        return history.push('/admin/create/product')
    }

    const productedit = (id) => {
        history.push(`/admin/edit/product/${id}`)
    }

    return (
        <div>
            {loading && <Loader></Loader>}
            {!loading &&
                <div className="container my-5" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <h1>PRODUCTS</h1>
                        <div style={{ marginLeft: "70%", alignItems: "flex-start" }}>
                            <Button className="btn btn-dark my-3" onClick={() => CreateProduct()}>+ Crete Product</Button>
                        </div>
                    </div>

                    <div style={{ marginTop: "50px" }}>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Brand</th>
                                    <th>CountInStock</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.map((product) =>
                                    <tr key={product._id}>
                                        <th>{product._id}</th>
                                        <th>{product.name}</th>
                                        <th><i className="fas fa-rupee-sign">{product.price}</i></th>
                                        <th>{product.brand}</th>
                                        <th>{product.countInstock ?
                                            product.countInstock
                                            : <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        }</th>
                                        <th>
                                            <Button variant='light' className='btn-sm'
                                                onClick={() => productedit(product._id)}>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                            <Button
                                                variant='danger'
                                                className='btn-sm'
                                                onClick={() => deleteproduct(product._id)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </th>
                                    </tr>
                                )}

                            </tbody>
                        </Table>
                    </div>
                </div>
            }

        </div>
    )
}

export default ProductListScreen
