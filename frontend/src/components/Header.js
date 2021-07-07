import React from 'react'
import { Navbar, Nav, Container, NavLink, NavDropdown } from 'react-bootstrap'
import { userlogout } from '../Actions/UserActions'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';

const Header = () => {

  const userlogin = useSelector(state => state.userloginreducer)
  const { userinfo } = userlogin
  const dispatch = useDispatch()
  const logouthandler = () => {
    dispatch(userlogout())

  }

  return (
    <div>
      <header >
        <>
          <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect style={{ height: "100px" }}>
            <Container>
              <Link to='/' style={{ textDecoration: "none" }}>
                <Navbar.Brand><h3 style={{ color: "white" }}>Aswin E-Store</h3></Navbar.Brand>
              </Link>
              <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
              <Navbar.Collapse className="justify-content-end">
                <Nav className="ml-auto">
                  <LinkContainer to='/wishlist'>
                    <NavLink>
                      <i className="fas fa-heart"><strong style={{ marginLeft: "2px" }}>Wishlist</strong></i>
                    </NavLink>
                  </LinkContainer>
                  <LinkContainer to='/Cart'>
                    <NavLink>
                      <i className="fas fa-cart-plus"><strong>Cart</strong></i>
                    </NavLink>
                  </LinkContainer>
                  {userinfo ? (

                    <NavDropdown title={<i className="fas fa-user-alt"> {userinfo.name}</i>} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logouthandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <LinkContainer to='/login'>
                      <Nav.Link>
                        <i className="fas fa-user-tie"></i> Sign In
                      </Nav.Link>
                    </LinkContainer>
                  )}

                  {userinfo && userinfo.isAdmin && (
                    <NavDropdown title={<i className="fas fa-archive">Archive</i>} id='username'>
                      <LinkContainer to='/admin/users'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orders'>
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>


        </>
      </header>
    </div>
  )
}

export default Header
