import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { cartAddAction, removeCartItems } from '../Actions/CartActions'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Message from '../components/Message.js'
import { Link } from 'react-router-dom';

import { currencytoAmount, currencyformatter } from '../Actions/CartActions'
import ButtonBase from '@material-ui/core/ButtonBase';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from 'react-bootstrap'
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  image: {
    width: 100,
    height: 100,

  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: 150,
    maxHeight: 120,
  },
  papergrid: {
    paddingTop: 10
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  Card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  maindiv: {
    width: "80%",
  },
  amountdiv: {

    display: "flex",
    flexDirection: "row",
    paddingTop: 60,
    flexGrow: 1,

  },
  listtext: {
    marginLeft: "5px",
    marginRight: "5px",
    padding: "10px"
  }
}));


const CartScreen = ({ match, location, history }) => {
  const classes = useStyles()
  const product_id = match.params.id;
  const Qty = location.search ? (Number(location.search.split("=")[1])) : 1
  const [qty, setqty] = useState(Qty)
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const cartitems = cart.cartitems
  const userloginreducer = useSelector(state => state.userloginreducer)
  const { userinfo } = userloginreducer
  const checkouthandler = (e) => {
    e.preventDefault()

    const { userinfo } = userloginreducer


    if (userinfo) {

      history.push('/shipping')
    } else {
      window.alert("you're not logged in,please login ! ")
    }
  }


  useEffect(() => {
    if (product_id) {
      dispatch(cartAddAction(product_id, qty))
    }
  }, [product_id, qty, dispatch])
  //  Array((cartitems)).map((item)=>{console.log(item.length)})
  const Removeitem = (id) => {

    dispatch(removeCartItems(id))
  }

  console.log(typeof (cartitems));


  if (Array.isArray(cartitems)) {

    console.log(cartitems.length)
  }

  return (
    < div className={classes.root}>
      <div className={classes.maindiv}>
        <Grid container className={classes.root} spacing={2} >
          <Grid item={true} md={4} lg={2} xl={3} >
            <Link to='/' className="btn btn-dark my-3">
              GO BACK
            </Link>
          </Grid>
        </Grid>
        <Grid container className={classes.heading} >
          <Grid item={true} lg={10} md={12} xl={12} xs={4}>
            <h1 className="Cartheading">SHOPPING CART</h1>
            <Divider component="li"></Divider>
          </Grid>
        </Grid>
        {(Array.isArray(cartitems)) ? cartitems.length > 0 ?
          cartitems.map((item) => (
            <div className={classes.root} key={item.product}>
              <Grid container spacing={2}  >
                <Grid item lg={10} sm={8}>
                  <Paper className={classes.paper} elevation={3}>
                    <Grid container spacing={2} direction="row" >
                      <Grid item lg={3} sm={12} xs={12}>
                        <ButtonBase className={classes.image} >
                          {item.image.startsWith('/') ? <img className={classes.img} alt="complex" src={item.image} /> :
                            <img className={classes.img} alt="complex" src={"/" + item.image} />
                          }
                        </ButtonBase>
                      </Grid>
                      <Grid item lg={3} sm={12} >
                        <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}><h4>{item.name}</h4></Link>

                        <Grid item lg={12} sm={12} xs={12}>

                          <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label"><h5>Qty</h5></InputLabel>
                            <Select
                              labelId="demo-simple-select-filled-label"
                              id="demo-simple-select-filled"
                              value={item.Quantity ? item.Quantity : Qty}
                              onChange={(e) => dispatch(cartAddAction(item.product, Number(e.target.value)))}
                            >
                              {[...Array(item.countInstock).keys()].map(
                                (x) => (
                                  <MenuItem key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>


                        </Grid>
                      </Grid>

                      <Grid item lg={3} sm={12} xs={12}>
                        <h3><i className="fas fa-rupee-sign"> {item.price}</i></h3>
                      </Grid>

                      <Grid item lg={3} sm={12} xs={12}>
                        <button onClick={() => Removeitem(item.product)}>
                          <h1> <i className="fas fa-trash"></i></h1>
                        </button>
                      </Grid>
                    </Grid>

                  </Paper>
                </Grid>

              </Grid>

            </div>
          ))
          : <Message>No items in the Cart <Link to='/'>Go Back</Link></Message> : <div></div>
        }

      </div>
      {cartitems.length > 0 &&
        <div >
          <Grid item lg={3} className={classes.amountdiv} >
            <Paper>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem >

                  <ListItemText className={classes.listtext} primary={<p className="subtotal">SubTotal</p>} />


                  <ListItemText className={classes.listtext} primary={<p className="subtotal"><i className="fas fa-rupee-sign">{cartitems.length > 0 ? currency(cartitems) : 0}</i></p>} />

                </ListItem>
                <Divider></Divider>
                <ListItem >

                  <ListItemText className={classes.listtext} primary={<p className="subtotal">Shipping</p>} />


                  <ListItemText className={classes.listtext} primary={<p className="subtotal"><i className="fas fa-rupee-sign">0</i></p>} />

                </ListItem>
                <Divider></Divider>
                <ListItem >

                  <ListItemText className={classes.listtext} primary={<p className="subtotal">Total</p>} />


                  <ListItemText className={classes.listtext} primary={<p className="subtotal"><i className="fas fa-rupee-sign">{cartitems.length > 0 ? currency(cartitems) : 0}</i></p>} />

                </ListItem>
                <ListItem >
                  <Button className="btn-block" type="button"
                    style={{ marginLeft: "70px" }} onClick={checkouthandler}
                    disabled={!userinfo && true}
                  >PROCEED TO CHECKOUT</Button>
                </ListItem >
              </List>
            </Paper>
          </Grid>
        </div>
      }

    </div>
  )
}

const currency = (cartitems) => {
  var total = cartitems.reduce((acc, item) => acc + currencytoAmount(item), 0)
  var totalamount = ""
  if (total) {
    totalamount = currencyformatter(total)
  }
  return totalamount
}



export default CartScreen
