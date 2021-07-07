import React from 'react';
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
import { useEffect } from 'react'
import { currencytoAmount, currencyformatter } from '../Actions/CartActions'
import './OrderPlace.css'
import { orderplacementActions } from '../Actions/OrderActions'

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
    height: 520,
    width: 360,
    margin: "20px"
  }
}));


const OrderPlacementScreen = ({ history }) => {

  const classes = useStyles();
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const userloginreducer = useSelector(state => state.userloginreducer)
  const { shippingAddress, paymentmethod, cartitems } = cart
  const { userinfo } = userloginreducer
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  useEffect(() => {

    if (!userinfo) {
      history.push('/login')
    } else if (!shippingAddress) {
      history.push('/shipping')
    } else if (!paymentmethod) {
      history.push('/payment')
    } else if (cartitems) {
      cartitems.map((item) => item.shippingprice = (currencytoAmount(item) > 1000) ? 100 : 0)
      cartitems.map((item) => item.taxprice = addDecimals(Number((0.001 * currencytoAmount(item)))))
    }
  }, [history, paymentmethod, shippingAddress, userinfo])
  const CreateOrderreducer = useSelector(state => state.CreateOrderreducer)
  const { success, Order } = CreateOrderreducer

  const submithandler = (e) => {
    e.preventDefault()
    if (shippingAddress && paymentmethod && cartitems) {
      var TotalShippingprice = cartitems.reduce((acc, item) => acc + Number(item.shippingprice), 0)
      var TotalTaxPrice = addDecimals(cartitems.reduce((acc, item) => acc + Number(item.taxprice), 0))
      var TotalPrice = cartitems.reduce((acc, item) => acc + currencytoAmount(item) + Number(item.shippingprice) + Number(item.taxprice), 0)
      if (TotalShippingprice && TotalTaxPrice && TotalPrice) {
        dispatch(orderplacementActions({
          Orderitems: cart.cartitems,
          shippingAddress: cart.shippingAddress,
          PaymentMethod: cart.paymentmethod,
          TotalShippingprice,
          TotalTaxPrice,
          TotalPrice
        }))
      }

    }


  }

  useEffect(() => {
    if (success) {
      history.push(`/order/${Order._id}`)
    }
    if (cartitems) {
      cartitems.map((item) => item.shippingprice = (currencytoAmount(item) > 1000) ? 100 : 0)
      cartitems.map((item) => item.taxprice = addDecimals(Number((0.001 * currencytoAmount(item)))))
    }
  }, [success, history, cartitems])


  const totalprice = () => {
    if (cart.cartitems) {
      return cart.cartitems.reduce((acc, item) => acc + currencytoAmount(item) + Number(item.shippingprice) + Number(item.taxprice), 0)
    }

  }

  const Shippingprice = () => {
    if (cart.cartitems) {
      return cart.cartitems.reduce((acc, item) => acc + Number(item.shippingprice), 0)
    }

  }

  const TaxPrice = () => {
    if (cart.cartitems) {
      return addDecimals(cart.cartitems.reduce((acc, item) => acc + Number(item.taxprice), 0))
    }

  }
  const currency = (cartitems) => {
    var total = cartitems.reduce((acc, item) => acc + currencytoAmount(item), 0)
    var totalamount = ""
    if (total) {
      totalamount = currencyformatter(total)
    }
    return totalamount
  }

  return (
    <div className="placement">
      <div>
        < CheckoutStep step1 step2 step3 step4 />
      </div>
      <div className="orders">
        <div className="orderdatas">

          <Grid item lg={8}  >
            <div className={classes.item}>
              <h1 className="placeheading">Shipping</h1>
            </div>
          </Grid>
          <Grid item lg={8}>
            <p className="placeinfo">
              <strong>Address : </strong>
              {shippingAddress.address},{" "},
              {shippingAddress.city},{" "},
              {shippingAddress.postalcode},{" "},
              {shippingAddress.country},{" "}
            </p>
          </Grid>
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
          <Divider></Divider>
          <Grid item lg={8}  >
            <div className={classes.item}>
              <h1 className="placeheading">ORDER ITEMS</h1>
            </div>

          </Grid>
          <Grid item lg={4} >
            {cartitems && cartitems.map((item) =>

              <Paper className={classes.paper} elevation={1} key={item.product}>
                <Grid item lg={2}>
                  <img className={classes.img} src={item.image} alt="itmimg"></img>
                </Grid>
                <Grid item lg={5}>
                  <p className="placeinfo">
                    <strong>{item.name}</strong>
                  </p>
                </Grid>
                <Grid item lg={4}>
                  <p className="placeinfo">
                    {item.Quantity}  x <i className="fas fa-rupee-sign"> {currencyformatter((currencytoAmount(item) / item.Quantity))}</i>{"   "}=<i className="fas fa-rupee-sign"> {item.price}</i>
                  </p>
                </Grid>
                <Grid item lg={4}>
                  <p className="placeinfo">
                    Shipping :<i className="fas fa-rupee-sign">{item.shippingprice = (currencytoAmount(item) > 1000) ? 100 : 0} </i>
                  </p>
                </Grid>
                <Grid item lg={4}>
                  <p className="placeinfo">
                    Tax :<i className="fas fa-rupee-sign">{item.taxprice = addDecimals(Number((0.001 * currencytoAmount(item))))} </i>
                  </p>
                </Grid>

              </Paper>)}
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


                  <ListItemText primary={<p className="ordersum"><i className="fas fa-rupee-sign">{currency(cartitems)}</i></p>} />

                </ListItem>
                <Divider></Divider>
                <ListItem >

                  <ListItemText primary={<p className="ordersum">Shipping</p>} />


                  <ListItemText primary={<p className="ordersum"><i className="fas fa-rupee-sign">
                    {Shippingprice()}</i></p>} />

                </ListItem>
                <Divider></Divider>
                <ListItem >

                  <ListItemText primary={<p className="ordersum">Tax</p>} />


                  <ListItemText primary={<p className="ordersum"><i className="fas fa-rupee-sign">
                    {TaxPrice()}</i></p>} />

                </ListItem>
                <Divider></Divider>
                <ListItem >

                  <ListItemText primary={<p className="ordersum">Total</p>} />


                  <ListItemText primary={<p className="ordersum"><i className="fas fa-rupee-sign">{currencyformatter(addDecimals(totalprice()))}</i></p>} />

                </ListItem>
                <ListItem >
                  <Button className="btn-block" type="button"
                    style={{ marginLeft: "100px" }} disabled={cartitems.length === 0 ? "disabled" : ""}
                    onClick={submithandler}
                  >PLACE ORDER</Button>
                </ListItem >
              </List>
            </Paper>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default OrderPlacementScreen
