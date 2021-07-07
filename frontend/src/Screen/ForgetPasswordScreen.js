import React from 'react'
import './FP.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mailsentdaction, OTPverifiedaction } from '../Actions/UserActions'
import { Message } from '../components/Message';
const ForgetPasswordScreen = ({ history }) => {
    const [EnteredOTP, setEnteredOTP] = useState(null)
    const [send, setsend] = useState(false)
    const [email, setemail] = useState(null)
    const emailsentreducer = useSelector(state => state.emailsentreducer)
    var { mailsent, error } = emailsentreducer
    const verifyOTPactionreducer = useSelector(state => state.verifyOTPactionreducer)
    var { verified, verifyerror } = verifyOTPactionreducer
    const dispatch = useDispatch()

    useEffect(() => {
        if (mailsent) {
            setsend(true)
        }

    }, [mailsent])
    const mailsender = (e) => {
        e.preventDefault()
        if (email) {
            dispatch(mailsentdaction(email))

        }
    }

    const resetpassword = (e) => {
        e.preventDefault()
        if (mailsent) {
            dispatch(OTPverifiedaction(mailsent.otp, Number(EnteredOTP)))
            if (verified) {
                if (verified.success === true) {
                    history.push('/resetpassword')
                }
            }

        }
    }
    return (

        <div className="fp">
            {verifyerror && <Message variant="danger">{verifyerror}</Message>}
            {mailsent && <Message variant="success">{mailsent.success}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            <div className="email">
                <input type="text" placeholder="email" onChange={(e) => setemail(e.target.value)}></input>
                <button className="send" onClick={mailsender}>Send</button>
            </div>
            {send &&
                <div>
                    <h3>The 4 digit OTP has been sent to your Gmail id</h3>
                    <div className="otp">
                        <input type="text" placeholder="4-digit-OTP" onChange={(e) => setEnteredOTP(e.target.value)}></input>
                        <p className="resend" onClick={mailsender}>Resend OTP</p>
                        <button className="verify" onClick={resetpassword}>verify</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ForgetPasswordScreen
