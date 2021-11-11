
import './App.css';
import Header from './components/Header';
import { Route,Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Restro_Signup from './components/Restro_Signup';
import Customer_Login from './components/Customer_Login';
import Restro_Login from './components/Restro_Login';
import Restro_landing from './components/Restro_landing';
import HomePage from './components/HomePage';
import CustomerLanding from './components/CustomerLanding';
import Dish from './components/Dish.js';
import Customer_Profile from './components/Customer_Profile.js'
import Cust_Restro_Landing from './components/Cust_Restro_Landing';
import Cart from './components/Cart';
import Favourites from './components/Favourites';
import Checkout from './components/Checkout';
import Order from './components/Order';
import Restro_Order from './components/Restro_Order';
import Restro_Customer_Profile from './components/Restro_Customer_Profile';
import Restro_Dish from './components/Restro_Dish';


function App() {
  return (
    <div  className="App">
      {/* style ={  { backgroundImage: "url('http://localhost:3000/UberEats.jpg')",width:'100%',height:"1200%"} } */}
      {/* <Header title="Welcome to my app"/> */}
      <Header/>

      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/customer" component={Customer_Login}></Route>
        <Route exact path="/restaurant" component={Restro_Login}></Route>
        <Route path="/customerSignup" component={Signup}></Route>
        <Route path="/restaurantSignup" component={Restro_Signup}></Route>
        <Route path="/customerLanding" component={CustomerLanding }></Route>
        <Route path="/restroLanding" component={Restro_landing }></Route>
        <Route path="/adddish" component={Dish}></Route>
        <Route path="/customerProfile" component={Customer_Profile}></Route>
        <Route path="/viewrestro" component={Cust_Restro_Landing}></Route>
        <Route path="/customercart" component={Cart}></Route>
        <Route path="/favourites" component={Favourites}></Route>
        <Route path="/checkout" component={Checkout}></Route>
        <Route path="/orders" component={Order}></Route>
        <Route path="/restroorders" component={Restro_Order}></Route>
        <Route path="/restrocustprofile" component={Restro_Customer_Profile}></Route>
        <Route path="/restrodishes" component={Restro_Dish}></Route>
        
      </Switch>
      
    </div>
  );
}

export default App;
