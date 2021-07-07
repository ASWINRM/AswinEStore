import './App.css';
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import Homescreen from './Screen/Homescreen'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import LoginScreen from './Screen/LoginScreen'
import { Route } from 'react-router-dom'
import SignUpScreen from './Screen/SignUpScreen'
import Productscreen from './Screen/Productscreen'
import CartScreen from './Screen/CartScreen'
import ProfileScreen from './Screen/ProfileScreen';
import ForgetPasswordScreen from './Screen/ForgetPasswordScreen'
import ResetPassword from './Screen/ResetPassword'
import ShippingScreen from './Screen/ShippingScreen';
import PaymentScreen from './Screen/PaymentScreen';
import OrderPlacementScreen from './Screen/OrderPlacementScreen';
import OrderScreen from './Screen/OrderScreen'
import WishlistScreen from './Screen/WishlistScreen';
import ReturnScreen from './Screen/ReturnScreen';
import UserListScreen from './Screen/UserListScreen';
import ProductListScreen from './Screen/ProductListScreen';
import ProducteditScreen from './Screen/ProducteditScreen';
import ProductCreateScreen from './Screen/ProductCreateScreen'
import OrdersListScreen from './Screen/OrdersListScreen';
import OrderDetailsScreen from './Screen/OrderDetailsScreen';
import { CarouselScreen } from './Screen/Carousel';
function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <main>
          <Container>

            <Switch>

              <Route path='/' exact component={Homescreen}></Route>
              <Route path='/product/:id' component={Productscreen}></Route>
              <Route path='/login' component={LoginScreen}></Route>
              <Route path='/Cart/:id?' component={CartScreen}></Route>
              <Route path='/Signup' exact component={SignUpScreen}></Route>
              <Route path='/profile' exact component={ProfileScreen}></Route>
              <Route path='/forgotpassword' exact component={ForgetPasswordScreen}></Route>
              <Route path='/resetpassword' exact component={ResetPassword}></Route>
              <Route path='/shipping' component={ShippingScreen}></Route>
              <Route path='/payment' component={PaymentScreen}></Route>
              <Route path='/OrderPlacement' component={OrderPlacementScreen}></Route>
              <Route path='/order/:id' component={OrderScreen}></Route>
              <Route path='/wishlist' component={WishlistScreen}></Route>
              <Route path='/return/:id' component={ReturnScreen}></Route>
              <Route path='/admin/users' component={UserListScreen}></Route>
              <Route path='/admin/productlist' component={ProductListScreen}></Route>
              <Route path='/admin/edit/product/:id' component={ProducteditScreen}></Route>
              <Route path='/admin/create/product' component={ProductCreateScreen}></Route>
              <Route path='/admin/orders' component={OrdersListScreen}></Route>
              <Route path='/admin/orderdetails/:id' component={OrderDetailsScreen}></Route>
              <Route path='/carousel' component={CarouselScreen}></Route>
            </Switch>
          </Container>

        </main>

      </Router>
    </div>
  );
}

export default App;
