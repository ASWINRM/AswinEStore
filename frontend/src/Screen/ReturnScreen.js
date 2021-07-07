import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Button } from 'react-bootstrap'
import './return.css'
import { returnaction } from '../Actions/OrderActions';
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useState } from 'react';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: "25px"

    },
    heading: {
        marginTop: "25px",
        fontSize: "60px",
        fontFamily: "Inconsolata",
        color: "black"
    },
    paper: {
        display: "flex",
        flexDirection: "row",
        width: "100%"

    },
    image: {
        height: "150px",
        width: "150px"
    },
    name: {
        display: "flex",
        flexDirection: "column",
        padding: "10px",

    },

    align: {
        display: 'flex',
        flexDirection: 'row'
    }

}));

const ReturnScreen = ({ match }) => {
    const classes = useStyles();
    const OrderByIdreducer = useSelector(state => state.OrderByIdreducer)
    const { order } = OrderByIdreducer
    const { orderItems } = order
    const returnreducer = useSelector(state => state.returnreducer)
    var { returned, loading } = returnreducer
    const [ID, setID] = useState(null)
    const [productname, setproductname] = useState(null)
    const [Issue, setIssue] = useState(null)
    const [openform, setopenform] = useState(false)
    const [btn, setbtn] = useState(true)
    const dispatch = useDispatch()
    const returnrequest = () => {
        if (ID, productname) {
            dispatch(returnaction(ID, productname))
        }
        setbtn(false)
        setopenform(false)
    }


    const opened = () => {
        setID("")
        setproductname("")
        setIssue("")
        setbtn(true)
        setopenform(true)
    }
    return (
        <div className={classes.root} >

            <div className={classes.heading}>
                <p style={{ float: "left" }}>RETURN PAGE :</p>
            </div>
            <div className={classes.align}>
                <div className="row rows">
                    {orderItems && orderItems.map((item, index) =>
                        <div className="col-12 col-md-12 colls " key={item.product}>
                            <Paper key={index} className={classes.paper} elevation={3}>
                                {item.image.startsWith('/') ? <Image src={item.image} alt="imagename" className='card-img-top' id="image"></Image> :
                                    <Image src={"/" + item.image} alt="imagename" className='card-img-top' id="image"  ></Image>

                                }
                                <div className={classes.name}>
                                    <h3>{item.name}</h3>
                                    <h3>QTY : {item.Quantity}</h3>
                                    <h2><i className="fas fa-rupee-sign">{item.price}</i></h2>
                                    {
                                        item.return === false && <Button className="btn btn-dark my-3 btn-block "
                                            onClick={() => opened()}
                                        >RETURN</Button>
                                    }
                                    {
                                        item.return &&
                                        <Button className="btn btn-dark my-3 btn-block "
                                            disabled
                                        >REQUESTED</Button>
                                    }
                                </div>
                            </Paper>
                        </div>

                    )}
                </div>
                {loading && <Loader></Loader>}
                {openform &&
                    <div className="card cards">
                        <div className="card-header">
                            <h1>Return Form</h1>
                        </div>
                        <div className="card-body">
                            <form action="" method="POST">

                                <div className="form-group">
                                    <label ><p className="labell">ORDER ID :</p></label>
                                    <input
                                        type="text"
                                        className="control"
                                        placeholder="Order Id"
                                        value={ID}
                                        onChange={(e) => setID(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label  ><p className="labell">PRODUCT NAME :</p></label>
                                    <input
                                        type="text"
                                        className="control"
                                        placeholder="Product Name"
                                        value={productname}
                                        onChange={(e) => setproductname(e.target.value.toLowerCase())}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label ><p className="labell">Issue :</p></label>
                                    <textarea
                                        type="text"
                                        className="control"
                                        placeholder="write 5 lines about your issue with the product"
                                        rows='5'
                                        value={Issue}
                                        onChange={(e) => setIssue(e.target.value)}
                                        required
                                    />
                                </div>
                                {btn &&
                                    <div>
                                        <Button className="btn btn-dark my-3 btn-block"
                                            onClick={() => returnrequest()}
                                        >Submit</Button>
                                    </div>}


                            </form>
                        </div>
                    </div>
                }
                <div className="returnmsg">
                    {loading && <Loader></Loader>}
                    {
                        returned && !btn && <Message variant="success">Request for an Return
                            , Your amount will be refunded within a week</Message>
                    }
                </div>
            </div>




        </div>
    )
}

export default ReturnScreen