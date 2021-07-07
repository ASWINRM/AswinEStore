import './profile.css'
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetpasswordaction } from '../Actions/UserActions'
//import { useSelector,useDispatch } from 'react-redux';
import { Message } from '../components/Message';
//import {userPasswordCheck,userdetailaction,userupdateprofileaction} from '../Actions/UserActions'
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



export const ResetPassword = ({ history }) => {
  const classes = useStyles();
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [Open, setOpen] = useState(true)
  const [Email, setEmail] = useState(null)
  const [error, seterror] = useState(null)
  const dispatch = useDispatch()
  const resetpasswordreducer = useSelector(state => state.resetpasswordreducer)
  const { reset, reseterror } = resetpasswordreducer


  const handleClose = () => {

    setOpen(false);
  };

  const resetpassword = (e) => {
    e.preventDefault()

    if (Email && ConfirmPassword && Password) {
      if (ConfirmPassword === Password) {
        dispatch(resetpasswordaction(Email, Password))
        if (reset) {
          if (reset.success === true) {
            history.push('/')
          }
        }


      } else {
        seterror("The Password doesn't match")
      }
    } else {
      seterror("Please fill out all the fields")
    }
  }

  return (
    <div>
      {error && <Message variant="danger">{error}</Message>}
      {reseterror && <Message>{reseterror}</Message>}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={Open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={Open}>
          <div className={classes.paper}>
            {/* {passmessage &&<Message variant="success">{passmessage}</Message>}
              {error && <Message variant="danger">{error}</Message>} */}
            <div className="heading">
              <h3>email : </h3>
            </div>
            <div className="rowmodal">
              <input type="password" placeholder="email"
                onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className="heading">
              <h3>Password : </h3>
            </div>
            <div className="rowmodal">
              <input type="password" placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div className="heading">
              <h3>Confirm Password : </h3>
            </div>
            <div className="rowmodal">
              <input type="password" placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}></input>
            </div>
            <div className="rowbutton" style={{ width: "100%" }}>
              <button onClick={resetpassword}>Reset</button>
            </div>
          </div>

        </Fade>
      </Modal>
    </div>
  )
}

export default ResetPassword;
