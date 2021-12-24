import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CheckoutStep from '../components/CheckoutStep';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from 'react-bootstrap'
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { currencytoAmount, currencyformatter, currencytransformer } from '../Actions/CartActions'
import { orderByIdAction, orderPaidaction } from '../Actions/OrderActions'
import './OrderPlace.css'
import Message from '../components/Message'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
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

const OrderScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(match.params.id)
    dispatch(orderByIdAction(match.params.id))
  }, [dispatch, match.params.id])
  const classes = useStyles();
  const CreateOrderreducer = useSelector(state => state.CreateOrderreducer)
  // const { Order } = CreateOrderreducer;


  const OrderByIdreducer = useSelector(state => state.OrderByIdreducer)
  const { order, loading } = OrderByIdreducer
  const { orderItems, user, Shippingaddres, paymentmethod, taxprice,
    shippingprice, Totalprice, _id, isPaid, isdeliverd,
    paidAT, deliveredAT } = order ? order : OrderByIdreducer

  const OrderPayreducer = useSelector(state => state.OrderPayreducer)
  const { successpay } = OrderPayreducer
  const userloginreducer = useSelector(state => state.userloginreducer)
  const { userinfo } = userloginreducer


  const payorderaction = async (token) => {
    const price = Math.round(Number(Totalprice) * 100)
    const { name } = userinfo
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const { data } = await axios.post(`https://aswinestoreww.herokuapp.com/api/order/pay`, { token, price, name }, config)
    if (data) {
      console.log(data)
      setsdkReady(false)
      dispatch(orderPaidaction(_id))

    }

  }


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

  const returnproduct = () => {
    history.push(`/return/${match.params.id}`)
  }

  useEffect(() => {
    dispatch(orderByIdAction(match.params.id))

  }, [successpay, match.params.id])
  const [sdkReady, setsdkReady] = useState(isPaid ? false : true)
  return (
    <div>
      {loading && <Loader></Loader>}
      {!loading &&
        <div className="placement">

          <div>
            < CheckoutStep step1 step2 step3 step4 />
          </div>

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
              {isdeliverd && <Message variant="success">Delivered On {deliveredAT}</Message>}
              {isPaid && !isdeliverd && <Message variant="success">The Products will be delivered within 3 days</Message>}
              {!isdeliverd && <Message variant="danger">Not Delivered</Message>}
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


                      <ListItemText primary={<p className="ordersum"><i className="fas fa-rupee-sign">{currency(orderItems)}</i></p>} />

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
                    {sdkReady && <ListItem>
                      <StripeCheckout
                        name="BUY From Aswin E-Store"
                        amount={Totalprice && Math.round(Number(Totalprice) * 100)}
                        currency="INR"
                        stripeKey="pk_test_51J4RCvSIuzvapgCalR5Z7IXQk7DVMHN1FfYqvtVG4wxvu1PIhQBL0Du7GzoxEUx8RiNd6HTmJwHsVA7IQCrm8dd500zPRzry5h"
                        token={payorderaction}
                      >
                        <Button className="btn-block" type="button"
                          style={{ marginLeft: "70px" }} >BUY THE PRODUCTS </Button>
                      </StripeCheckout>
                    </ListItem>}
                    {isPaid &&
                      <Button className="btn-block" type="button"
                        style={{ width: "150px" }} onClick={() => returnproduct()}>RETURN </Button>
                    }

                    <ListItem >

                    </ListItem >
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



export default OrderScreen
