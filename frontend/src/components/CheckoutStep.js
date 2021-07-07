import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import '../Screen/Shipping.css'
const CheckoutStep = ({step1,step2,step3,step4}) => {
    return (
        <Nav className='justify-content-center mb-4'>
         <Nav.Item>
             {step1? <LinkContainer to='/login'>
                 <Nav.Link><p className="steps">SIGN IN</p></Nav.Link>
             </LinkContainer>:
               <Nav.Link disabled><p style={{size:"20px"}}>SIGN IN</p></Nav.Link>}
         </Nav.Item>
         <Nav.Item>
             {step2? <LinkContainer to='/shipping'>
                 <Nav.Link><p className="steps">SHIPPING</p></Nav.Link>
             </LinkContainer>:
               <Nav.Link disabled><p className="steps">SHIPPING</p></Nav.Link>}
         </Nav.Item>
         <Nav.Item>
             {step3? <LinkContainer to='/payment'>
                 <Nav.Link><p className="steps">PAYMENT</p></Nav.Link>
             </LinkContainer>:
               <Nav.Link disabled><p className="steps">PAYMENT</p></Nav.Link>}
         </Nav.Item>
         <Nav.Item>
             {step4? <LinkContainer to='/OrderPlacement'>
                 <Nav.Link><p className="steps">PLACEORDER</p></Nav.Link>
             </LinkContainer>:
               <Nav.Link disabled><p className="steps">PLACEORDER</p></Nav.Link>}
         </Nav.Item>
        </Nav>
    )
}

export default CheckoutStep
