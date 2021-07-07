import React from 'react'
import { GoogleLogin } from 'react-google-login';
import './login.css'
import Message from '../components/Message'
import {useState,useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import {userloginaction,googleloginaction} from '../Actions/UserActions'

const LoginScreen = ({history}) => {
    const dispatch=useDispatch()
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const userlogin= useSelector(state => state.userloginreducer)
    const {userinfo,error}=userlogin

    const onloginsuccess=async (res)=>{
       const {email,name} =res?.profileObj
       const {tokenId}=res
       dispatch(googleloginaction(tokenId,email,name))
    }

    const onloginfailure=(error)=>{
        console.log(error)
    }

    const submithandler=(e)=>{
        e.preventDefault()
        dispatch(userloginaction(Email,Password))
    }
    

    useEffect(() => {
        if(userinfo){
            history.push('/')
        }
    
    }, [dispatch,userinfo,history])

   
    const clientId="140008249194-bsick7hrj00203dmg6qp7on6l4aq2en1.apps.googleusercontent.com"
    return (
        
        <div className="wrapper">
             {error && <Message variant="danger">{error}</Message>} 
            <div className="title">Sign In</div>
            <form action="#">
                <div className="row">
                <i className="fas fa-user-alt"></i>
                <input type="text" placeholder="Email " value={Email} required onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <div className="row">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" value={Password} required  onChange={(e)=>setPassword(e.target.value)}></input>
                </div>
                <div className="pass"><Link to='/forgotpassword'>Forgot password?</Link></div>
                <div className="rowbutton">
                    <input type="submit" value="Sign In" onClick={submithandler}></input>    
                </div>
                <div className="rowgoogle">
                <GoogleLogin
                   clientId={clientId}
                   buttonText={<p className="googletext">Login With Google</p>}
                   onSuccess={onloginsuccess}
                   onFailure={onloginfailure}
                   cookiePolicy={'single_host_origin'}
                  isSignedIn={true}
                  variant="contained"
                />
                </div>
                <div className="signuplink">New Customer?<Link to='/Signup'>SignUp</Link></div>
            </form>
        </div>
    )
}

export default LoginScreen
