import React from 'react'
import { orderslistaction } from '../Actions/OrderActions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components/Loader'
import { Table, Button } from 'react-bootstrap'
import { userlogout } from '../Actions/UserActions'
import { ORDERS_LIST_RESET } from '../constants/constants'
const OrdersListScreen = ({ history }) => {

    const dispatch = useDispatch()
    const userloginreducer = useSelector(state => state.userloginreducer)
    const { userinfo } = userloginreducer

    useEffect(() => {
        if (!userinfo.isAdmin) {
            dispatch({ type: ORDERS_LIST_RESET })
            dispatch(userlogout())
            return history.push('/login')
        }

        dispatch(orderslistaction())
    }, [dispatch, userinfo.isAdmin])

    const orderslistreducer = useSelector(state => state.orderslistreducer)
    const { orders, loading } = orderslistreducer




    const orderhandler = (id) => {
        return history.push(`/admin/orderdetails/${id}`)
    }

    return (
        <div className="container my-5" style={{ display: 'flex', flexDirection: 'column' }}>
            {loading && <Loader></Loader>}
            {!loading &&
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h1>ORDERS</h1>
                </div>

            }
            {orders && orders.map((o) => { o.user ? console.log(o.user.name) : console.log("kanna") })}

            {!loading &&
                <div style={{ marginTop: "50px" }}>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.map((order) =>

                                <tr key={order._id} >
                                    <th>{order._id}</th>
                                    {order.user && <th>{order.user.name}</th>}
                                    <th>{order.createdAt}</th>
                                    <th><i className="fas fa-rupee-sign">{order.Totalprice}</i></th>
                                    <th>{order.isPaid ?
                                        order.paidAT.substring(0, 10)
                                        : <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    }</th>
                                    <th>{order.isdeliverd ?
                                        order.deliveredAT.substring(0, 10) :
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>}
                                    </th>
                                    <th>
                                        <Button className='btn-sm' variant='light' onClick={() => orderhandler(order._id)}>
                                            Details
                                        </Button>
                                    </th>
                                </tr>
                            )}

                        </tbody>
                    </Table>
                </div>
            }

        </div>
    )
}

export default OrdersListScreen
