import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from 'react-bootstrap'
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { currencytoAmount, currencyformatter, currencytransformer } from '../Actions/CartActions'
import { orderByIdAction } from '../Actions/OrderActions'
import './OrderPlace.css'
import Message from '../components/Message'
import { ORDER_DELIVER_RESET } from '../constants/constants';
import { orderdeliveraction } from '../Actions/OrderActions'
import { userlogout } from '../Actions/UserActions';
import { Loader } from '../components/Loader'
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "row",
        padding: 10,
        flexGrow: 1,
    },
    paper: {
        height: 90,
        width: 900,
        padding: theme.spacing(2),
        margin: '10px',
        display: "flex",
        flexDirection: "row",
    },
    control: {
        padding: theme.spacing(2),
    },
    item: {
        float: "left",
        display: "flex",
        flexDirection: "column"
    },
    img: {
        margin: 'auto',
        display: 'flex',
        flexDirection: "row",
        maxWidth: 70,
        maxHeight: 70,
    },
    orderpaper: {
        height: 500,
        width: 360,
        margin: "20px"
    }
}));

const OrderDetailsScreen = ({ match, history }) => {
    const dispatch = useDispatch()

    const orderdeliverreducer = useSelector(state => state.orderdeliverreducer)
    const { deliverdSuccess, loading: loadingdeliver } = orderdeliverreducer

    const userloginreducer = useSelector(state => state.userloginreducer)
    const { userinfo } = userloginreducer
    useEffect(() => {

        if (!userinfo.isAdmin) {
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(userlogout())
            history.push('/login')
        }
        console.log(match.params.id)
        dispatch(orderByIdAction(match.params.id))
    }, [dispatch, deliverdSuccess, match.params.id, history])
    const classes = useStyles();



    const OrderByIdreducer = useSelector(state => state.OrderByIdreducer)
    const { order, loading } = OrderByIdreducer
    const { orderItems, user, Shippingaddres, paymentmethod, taxprice,
        shippingprice, Totalprice, _id, isPaid, isdeliverd,
        paidAT, deliveredAT } = order ? order : OrderByIdreducer











    const currency = (orderItems) => {
        if (orderItems) {
            var total = orderItems.reduce((acc, item) => acc + currencytoAmount(item), 0)
            var totalamount = ""
            if (total) {
                totalamount = currencyformatter(total)
            }
            return totalamount
        }

    }

    const deliverhandler = () => {
        dispatch(orderdeliveraction(match.params.id))
    }



    return (
        <div>
            {loading && <Loader></Loader>}
            {!loading &&
                <div className="placement">


                    <div className="orders">
                        <div className="orderdatas">
                            <Grid item lg={8}  >
                                <div className={classes.item}>
                                    <h3 className="placeheading">ORDER ID: {_id}</h3>
                                </div>
                            </Grid>

                            <Grid item lg={8}  >
                                <div className={classes.item}>
                                    <h1 className="placeheading">Shipping</h1>
                                    <p className="placeinfo"><strong>Name :</strong>
                                        {user ? user.name : " "}</p>
                                </div>
                            </Grid>

                            <Grid item lg={8}  >
                                <div className={classes.item}>
                                    <p className="placeinfo"><strong>Email :</strong>
                                        {user ? user.email : ""}</p>
                                </div>
                            </Grid>
                            <Grid item lg={8}>
                                <div className={classes.item}>
                                    <p className="placeinfo">
                                        <strong>Address : </strong>

                                        {Shippingaddres ? Shippingaddres.address : ""},{" "},
                                        {Shippingaddres ? Shippingaddres.city : ""},{" "},
                                        {Shippingaddres ? Shippingaddres.postalcode : ""},{" "},
                                        {Shippingaddres ? Shippingaddres.country : ""},{" "}
                                    </p>
                                </div>
                            </Grid>
                            {loadingdeliver && <Loader></Loader>}
                            {(!isdeliverd && !loadingdeliver) && <Message variant="danger">Not Delivered</Message>}
                            {isdeliverd && <Message variant="success">Delivered on ${deliveredAT}</Message>}
                            <Divider></Divider>
                            <Grid item lg={8}  >
                                <div className={classes.item}>
                                    <h1 className="placeheading">PAYMENT METHOD</h1>
                                </div>
                            </Grid>
                            <Grid item lg={8}>
                                <p className="placeinfo">
                                    <strong>Method : </strong>
                                    {paymentmethod}
                                </p>
                            </Grid>
                            {isPaid && <Message variant="success">Paid on {paidAT}</Message>}
                            {!isPaid && <Message variant="danger">Not Paid</Message>}
                            <Divider></Divider>
                            <Grid item lg={8}  >
                                <div className={classes.item}>
                                    <h1 className="placeheading">ORDER ITEMS</h1>
                                </div>

                            </Grid>
                            <Grid item lg={4} >
                                {orderItems ? orderItems && orderItems.map((item) =>

                                    <Paper className={classes.paper} elevation={3} key={item.product}>

                                        <Grid item lg={2}>
                                            {item.image.startsWith('/') ? <img className={classes.img} alt="itmimg" src={item.image} /> :
                                                <img className={classes.img} alt="itmimg" src={"/" + item.image} />
                                            }
                                        </Grid>
                                        <Grid item lg={6}>
                                            <p className="placeinfo">
                                                <strong>{item.name}</strong>
                                            </p>
                                        </Grid>
                                        <Grid item lg={4}>
                                            <p className="placeinfo">
                                                {item.Quantity} x <i className="fas fa-rupee-sign"> {currencyformatter((currencytoAmount(item) / item.Quantity))}</i>={"   "}<i className="fas fa-rupee-sign"> {item.price}</i>
                                            </p>
                                        </Grid>

                                    </Paper>) : ""}
                            </Grid>
                            <Divider></Divider>
                        </div>
                        <div className="ordersummary">
                            <Grid item >
                                <Paper className={classes.orderpaper} elevation={2}>
                                    <List component="nav" aria-label="main mailbox folders">
                                        <ListItem>
                                            <ListItemText primary={<h2 className="ordersum">ORDER SUMMARY</h2>} />
                                        </ListItem>
                                        <Divider></Divider>
                                        <ListItem >

                                            <ListItemText primary={<p className="ordersum">Items</p>} />


                                            <ListItemText primary={<p className="ordersum"><i className="fas fa-rupee-sign">{orderItems && currency(orderItems)}</i></p>} />

                                        </ListItem>
                                        <Divider></Divider>
                                        <ListItem >

                                            <ListItemText primary={<p className="ordersum">Shipping</p>} />


                                            <ListItemText primary={<p className="ordersum"><i className="fas fa-rupee-sign">{shippingprice && shippingprice}</i></p>} />

                                        </ListItem>
                                        <Divider></Divider>
                                        <ListItem >

                                            <ListItemText primary={<p className="ordersum">Tax</p>} />

                                            <ListItemText primary={<p className="ordersum"><i className="fas fa-rupee-sign">{taxprice && Number(taxprice)}</i></p>} />

                                        </ListItem>
                                        <Divider></Divider>
                                        <ListItem >

                                            <ListItemText primary={<p className="ordersum">Total</p>} />


                                            <ListItemText primary={<p className="ordersum"><i className="fas fa-rupee-sign">{Totalprice && currencytransformer(Totalprice)}</i></p>} />

                                        </ListItem>
                                        <Divider></Divider>
                                        {!deliverdSuccess &&
                                            <ListItem>
                                                <Button className="btn-block" type="button"
                                                    style={{ marginLeft: "70px" }} onClick={() => deliverhandler()}>MARK AS DELIVERED </Button>
                                            </ListItem>
                                        }


                                    </List>
                                </Paper>
                            </Grid>
                        </div>
                    </div>


                </div>
            }

        </div>
    )
}






export default OrderDetailsScreen
