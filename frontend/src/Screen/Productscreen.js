import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { listdetailproduct } from '../Actions/productActions';
import { Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import { reviewaction, reviewslistaction } from '../Actions/productActions'
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import './product.css'
import { FaStar } from 'react-icons/fa'
import Message from '../components/Message'
const useStyles = makeStyles((theme) => ({
  root: {

    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "row",

  },
  Card: {
    minwidth: 275,
    height: "100%"

  },
  image: {

    width: 450,
    height: "100%",
  },
  list: {
    maxWidth: "100%"
  },
  cardgrid: {
    display: "flex",
    flexDirection: "coloumn",
  },
  quantity: {
    display: "flex",
    flexDirection: "row",

  },
  review: {
    margin: "5px",
    padding: "5px"
  },
  comment: {
    padding: "5px"
  },
  rating: {
    margin: "15px",
    size: 100
  },
  reviewarea: {
    width: 200
  }
}));








const Productscreen = ({ match }) => {

  const classes = useStyles()
  const history = useHistory()
  const [reviewrating, setreviewrating] = useState(0)
  const [hover, sethover] = useState(0)
  const userloginreducer = useSelector(state => state.userloginreducer)
  const { userinfo } = userloginreducer
  const productDetailList = useSelector(state => state.productDetailList)
  const { product, loading } = productDetailList
  const Reviewreducer = useSelector(state => state.Reviewreducer)
  const { successreview } = Reviewreducer
  const Reviewslistreducer = useSelector(state => state.Reviewslistreducer)
  const { reviewslist } = Reviewslistreducer
  const { reviews } = product
  const [Qty, setQty] = useState(1)
  const color = reviewrating <= hover ? true : false
  const [comment, setcomment] = useState("")
  const [noratingmsg, setnoratingmsg] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listdetailproduct(match.params.id))
    setreviewrating(0)
    sethover(0)

  }, [dispatch, match.params.id])

  useEffect(() => {
    if (userinfo && product) {
      dispatch(listdetailproduct(match.params.id))

    }
  }, [successreview])

  const addCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${Qty}`)
  }

  const reviewhandler = (e) => {
    e.preventDefault()


    if (!userinfo) {
      setnoratingmsg("Please Login to give a review")
    } else {
      if (reviewrating > 0 && comment != "") {
        console.log("ok va review")
        dispatch(reviewaction(product._id, { rating: reviewrating, comment: comment }))
        setreviewrating("")
        setcomment("")
        sethover("")
      } else if (reviewrating === 0) {
        setnoratingmsg("The rating hasn't given so please rate the product")
      }
    }

  }

  return (

    <>

      <Grid container className={classes.root} spacing={2} >
        <Grid item={true} md={4} lg={2} xl={3} >
          <Link to={'/'} className="btn btn-dark my-3">
            GO BACK
          </Link>
        </Grid>
      </Grid>
      {loading ? (<Loader></Loader>) : (<div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item={true} md={4} lg={9} xl={3} >
            {/* {console.log(product.image)} */}
            {product.image && product.image.startsWith('/') ?
              <img className={classes.image} alt={product.name} src={product.image} /> :
              <img className={classes.image} alt={product.name} src={"/" + product.image} />
            }
          </Grid>
          {
            // console.log(product)
          }
          <Grid item={true} md={4} lg={12} xl={3}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem >
                <ListItemText primary={<h1>{product.name}</h1>} />
              </ListItem>

              <Divider />

              <ListItem>
                <ListItemText primary={<Rating value={product.rating}
                  text={`${product.numReviews} Reviews`}
                ></Rating>} />
              </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem >
                <ListItemText primary={<h3>Price : <i
                  className="fas fa-rupee-sign"> {product.price}</i></h3>} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={<p>{product.description}</p>} />
              </ListItem>
              <ListItem>
                <div className={classes.review}>
                  <ListItemText primary={<h1>WRITE A CUSTOMER REVIEW :</h1>}></ListItemText>
                  {noratingmsg && <Message variant="danger">{noratingmsg}</Message>}
                  <form>
                    <label><h3>Rating :</h3> </label>
                    <div className={classes.rating}>

                      {[1, 2, 3, 4, 5].map((index) =>
                        // <span
                        //   key={index}
                        //   onMouseEnter={() => sethover(index + 1)}
                        //   onMouseLeave={() => sethover(0)}
                        //   onClick={() => setreviewrating(index + 1)}
                        //   color={reviewrating <= hover ? "#FFD700" : "#e4e5e9"}
                        // ><i className="fas fa-star" ></i></span>
                        <FaStar
                          key={index}
                          size={30}

                          onMouseEnter={() => sethover(index)}
                          onMouseLeave={() => sethover(0)}
                          onClick={() => setreviewrating(index)}
                          color={(index <= reviewrating || index <= hover) ? "#FFD700" : "#C0C0C0"}
                        ></FaStar>
                      )}


                    </div>
                    <div className={classes.comment}>
                      <label>
                        <h3>Comment :</h3>
                      </label>
                      <textarea type="text" rows="6"
                        cols='60' className='controlarea' value={comment}
                        onChange={(e) => setcomment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <Button className="btn-block" type="button"
                        onClick={reviewhandler}
                      >
                        SUBMIT
                      </Button>
                    </div>
                  </form>
                </div>

              </ListItem>
            </List>

          </Grid>
        </Grid>

        <Grid container spacing={2} styel={{ width: 500 }}>
          <Grid item={true} md={6} lg={12} xl={3} className={classes.Card}>
            <Card style={{ width: "300px" }}>
              <CardContent>
                <List component='nav' aria-label="price box">
                  <ListItem>
                    <ListItemText primary={
                      <Grid container className={classes.cardgrid} justify="space-evenly" >
                        <Grid item md={12} lg={12} xl={3} >
                          <h1 className="quantity">PRICE:</h1>
                          <strong><i
                            className="fas fa-rupee-sign">{product.price}</i></strong>
                        </Grid></Grid>}></ListItemText>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary={
                      <Grid container className={classes.cardgrid} justify="space-evenly" >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={3}  >

                          <h1 className="quantity">STATUS :</h1>
                          <strong>{product.countInstock > 0 ? "InStock" : "Out of stock"}</strong>
                        </Grid>
                      </Grid>
                    }></ListItemText>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    {product.countInstock > 0 && (
                      <Grid container direction="row"
                        justify="space-evenly" spacing={2} className={classes.cardgrid}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={3} >
                          <h1 className="quantity">QTY :</h1>
                          <Form.Control
                            as='select'
                            value={Qty}
                            onChange={(e) => setQty(e.target.value)}
                            size="sm"
                          >
                            {[...Array(product.countInstock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Grid>
                      </Grid>


                    )}
                  </ListItem>
                  <ListItem>
                    <Grid container className={classes.cardgrid} justify="space-evenly">
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={3}  >
                        <CardActions>
                          <Button className="btn-block" type="button"
                            disabled={product.countInstock === 0}
                            onClick={addCartHandler}
                          >ADD TO CART</Button>
                        </CardActions>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
            {reviews &&
              <div style={{ margin: "15px" }} >
                {reviews.length > 0 && <h1 style={{ float: 'left' }}>Reviews :</h1>}

                {reviews.map((review) =>
                  <div className='card' style={{ width: "100%", height: "100px" }}
                    key={review._id}>
                    <div className='card-body' style={{ float: 'left', display: 'flex', flexDirection: "column" }} >
                      <h5 style={{ margin: "5px" }}>{review.name} :</h5>
                      <Rating value={review.rating}></Rating>
                      <p >{review.comment}</p>
                    </div>
                  </div>
                )}

              </div>
            }


          </Grid>

        </Grid>

      </div>)}




    </>

  );
}




export default Productscreen
