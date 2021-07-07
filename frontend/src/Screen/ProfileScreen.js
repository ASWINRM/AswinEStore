import React from 'react'
import './profile.css'
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Message } from '../components/Message';
import { Table, Button } from 'react-bootstrap'
import { Myordersaction } from '../Actions/OrderActions';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader'
import { userPasswordCheck, userdetailaction, userupdateprofileaction } from '../Actions/UserActions'
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    //backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: "#fff"
  }
}));
const ProfileScreen = () => {
  const classes = useStyles();
  var [open, setOpen] = useState(false);
  var [name, setname] = useState('');
  var [Email, setEmail] = useState('')
  var [Password, setPassword] = useState('')
  var [ConfirmPassword, setConfirmPassword] = useState('')
  var [disabledname, setdisabledname] = useState(true)
  var [disabledemail, setdisabledemail] = useState(true)
  var [message, setmessage] = useState(null)
  const [passmessage, setpassmessage] = useState(null)
  const inputnameref = useRef(null)
  const inputemailref = useRef(null)
  var [CurrentPassword, setCurrentPassword] = useState('')
  const dispatch = useDispatch()
  const userpasswordcheckreducer = useSelector(state => state.userpasswordcheckreducer)
  var { match, error } = userpasswordcheckreducer
  const userdetailreducer = useSelector(state => state.userdetailreducer)
  var { userdetail } = userdetailreducer

  const userupdateprofilereducer = useSelector(state => state.userupdateprofilereducer)
  const { success, failed, loading } = userupdateprofilereducer



  useEffect(() => {
    dispatch(userdetailaction())
    dispatch(Myordersaction())
    if (success) {
      setmessage("User Profile Updated, So Please Login Again")
    }
  }, [dispatch, success])

  useEffect(() => {

    if (userdetail) {
      name = userdetail.name
      Email = userdetail.email

    }
  }, [userdetail])

  const edit = (e) => {
    e.preventDefault()
    setdisabledname(false)
    if (!disabledname) {
      inputnameref.current.focus();
    }

  }
  const editemail = (e) => {
    e.preventDefault()
    setdisabledemail(false)
    if (!disabledemail) {
      inputemailref.current.focus();
    }

  }

  const passwordcheck = (currentpassword, password, confirmpassword) => {
    dispatch(userPasswordCheck(currentpassword))

  }


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

    setOpen(false);
  };

  const handlePasswordClose = (e) => {
    e.preventDefault()
    if (CurrentPassword && Password && ConfirmPassword) {
      console.log("allpasswordset")
      passwordcheck(CurrentPassword, Password, ConfirmPassword)

      if (match === true) {

        console.log("passwordmatched")
        setOpen(false);
      }
    }
    else {
      error = "Please Fill out all the fields"
    }
  };

  const MyOrderreducer = useSelector(state => state.MyOrderreducer)
  const { orders } = MyOrderreducer

  const submithandler = (e) => {
    e.preventDefault()
    if (Password !== '') {
      dispatch(userupdateprofileaction({ id: userdetail._id, name, Email, Password }))
    } else {
      dispatch(userupdateprofileaction({ id: userdetail._id, name, Email }))
    }

    if (success) {
      setmessage("User Profile Updated, So Please Login Again")
    } else if (failed) {
      error = "USER UPDATE FAILED"
    }
  }

  return (

    <div className="profile" >
      {loading && <Loader></Loader>}
      {!loading &&
        <div className="personalinfo">
          {message && <Message variant="success">{message}</Message>}
          <h1>USER PROFILE</h1>
          <form action="#">
            <div className="heading">
              <h3>Name : </h3>
              <p onClick={edit}> Edit</p>
            </div>
            <div className="rowprofile">
              <input type="text" placeholder={userdetail ? userdetail.name : "Name"} ref={inputnameref} disabled={disabledname ? "disabled" : ""}
                value={name} onChange={(e) => setname(e.target.value)}></input>
            </div>
            <div className="heading">
              <h3>Email : </h3>
              <p onClick={editemail}> Edit</p>
            </div>
            <div className="rowprofile">
              <input type="text" placeholder={userdetail ? userdetail.email : "Email"} ref={inputemailref} disabled={disabledemail ? "disabled" : ""}
                value={Email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className="heading">
              <h3>Password : </h3>
              <p onClick={handleOpen}> Edit</p>
            </div>
            <div className="rowprofile">
              <input type="password" placeholder="........." disabled
                value={Password}></input>
            </div>
            <div className="rowprofilebutton">
              <button onClick={submithandler}>Update</button>
            </div>
          </form>
        </div>
      }
      {!loading && <div className="myorders">


        <h1>MY ORDERS</h1>

        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID </th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          {orders && orders.map((order) =>
            <tbody key={order._id}>
              <tr>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td><i className="fas fa-rupee-sign">{order.Totalprice}</i></td>
                <td>{order.isPaid ? order.paidAT.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                <td>{order.isdeliverd ? order.deliveredAT.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <Button className='btn-sm' variant='light'>
                      Details
                    </Button>
                  </Link>
                </td>

              </tr>
            </tbody>
          )}
        </Table>



      </div>
      }


      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {passmessage && <Message variant="success">{passmessage}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            <div className="heading">
              <h3>Current Password : </h3>
            </div>
            <div className="rowprofilemodal">
              <input type="password" placeholder="CurrentPassword" value={CurrentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}></input>
            </div>
            <div className="heading">
              <h3>Password : </h3>
            </div>
            <div className="rowprofilemodal">
              <input type="password" placeholder="Password" value={Password}
                onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div className="heading">
              <h3>Confirm Password : </h3>
            </div>
            <div className="rowprofilemodal">
              <input type="password" placeholder="Confirm Password" value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}></input>
            </div>
            <div className="rowprofilebutton">
              <button onClick={handlePasswordClose}>Update</button>
            </div>
          </div>

        </Fade>
      </Modal>

    </div>
  )
}

export default ProfileScreen
