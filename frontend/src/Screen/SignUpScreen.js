import React from 'react'
import { GoogleLogin } from 'react-google-login';
import './login.css';
import { Message } from '../components/Message';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usersignupaction } from '../Actions/UserActions'
import { Loader } from '../components/Loader'

const SignUpScreen = ({ history }) => {
    const dispatch = useDispatch()
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [name, setname] = useState('')
    const [message, setmessage] = useState(null)
    const userlogin = useSelector(state => state.usersignupreducer)
    const { loading, userinfo, error } = userlogin

    const onsignupsuccess = async (res) => {

        console.log(res?.profileObj)
        const { email, name } = await res?.profileObj
        const { tokenId } = res
        if (email && name) {
            await setEmail(email)
            await setname(name)
            console.log(name, email)
            dispatch(usersignupaction(name, email, Password, tokenId))
        }
    }

    const onsignupfailure = (error) => {
        console.log(error)
    }

    const submithandler = (e) => {
        e.preventDefault()

        if (name === '' || Email === '' || Password === '' || ConfirmPassword === '') {
            setmessage("Please fill out the Form")
        } else {
            if (Password !== ConfirmPassword) {
                setmessage("Password does'nt Match")
            } else {
                console.log(name + " " + Email + ", " + Password)
                dispatch(usersignupaction(name, Email, Password))
            }
        }
    }


    useEffect(() => {
        if (userinfo) {
            history.push('/')
        }

    }, [dispatch, userinfo, history])


    const clientId = "140008249194-bsick7hrj00203dmg6qp7on6l4aq2en1.apps.googleusercontent.com"
    return (

        <div className="wrapper">
            {loading && <Loader></Loader>}
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            <div className="title">Sign Up</div>
            <form action="#" onSubmit={submithandler}>
                <div className="row">
                    <i className="fas fa-user-alt"></i>
                    <input type="text" placeholder="Username " value={name} required onChange={(e) => setname(e.target.value)} autoComplete="on"></input>
                </div>
                <div className="row">
                    <i className="fas fa-envelope"></i>
                    <input type="text" placeholder="Email " value={Email} required onChange={(e) => setEmail(e.target.value)} autoComplete="on"></input>
                </div>
                <div className="row">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="Password" value={Password} required onChange={(e) => setPassword(e.target.value)} autoComplete="on"></input>
                </div>
                <div className="row">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="Confirm Password" value={ConfirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="on"></input>
                </div>
                <div className="rowbutton">
                    <button className="signbutton" type="submit">Sign Up</button>
                </div>
                <div className="rowgoogle">
                    <GoogleLogin
                        clientId={clientId}
                        buttonText={<p className="googletext">Sign Up With Google</p>}
                        onSuccess={onsignupsuccess}
                        onFailure={onsignupfailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />
                </div>
            </form>
        </div>
    )
}

export default SignUpScreen
