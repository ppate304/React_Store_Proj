import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './views/Login.js';
import Logout from "./views/Logout";
import Shop from "./views/Shop";
import NavBar from './components/NavBar';
// import ProtectedRoute from "./components/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleItem from './views/SingleItem';
import EditItems from './views/EditItems'
import CreateItems from './views/CreateItems';
import ProtectedRoute from './components/ProtectedRoute.js';
export default class App extends Component {

  constructor() {
    super();
    this.state={
      token:'',
      user:'',
      cart: {}
      
    }
  }
  
  static getDerivedStateFromProps = (props, state) => {
    return { 
      token: localStorage.getItem("token"),
      cart: localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):{}
    };
  };

  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("storage",(e)=>{
        this.setState({cart:JSON.parse(localStorage.getItem("cart"))})
      })
    }
    }

  setUser = (user) => {
    this.setState({user}, () => console.log("User is", this.state.user));
  };

  setToken=(token)=>{
    this.setState({token})
    localStorage.setItem('token', token)
 }

 doLogout=()=>{
  console.log("Logged out")
  localStorage.clear();
  this.setToken('');
  this.setState({isAdmin:false, cart:{}});

}

 addToCart=(item)=>{
  let cart = this.state.cart
  if (cart[item.title]){
    cart[item.title].quantity++
  }else{
    cart[item.title]={...item,quantity:1}
  }
  this.setState({cart})
  localStorage.setItem("cart",JSON.stringify(cart))
  alert(`Thanks for adding ${item.title} to your cart`)
}

getCartItemTotal=()=>{
  let total=0
  for (const item in this.state.cart){
    total+=this.state.cart[item].quantity
  }
  return total
}


getCartTotalPrice=()=>{
  let total=0
  for (const item in this.state.cart){
    total+=this.state.cart[item].quantity*this.state.cart[item].price
  }
  return total
}

removeFromCart = (item)=>{
  let cart=this.state.cart;
  if (cart[item.title].quantity >1){
    cart[item.title].quantity--
  }else if (cart[item.title].quantity === 1){
    delete cart[item.title]
  }
  this.setState({cart})
  localStorage.setItem("cart",JSON.stringify(cart))
  alert(`You removed ${item.title} from your cart`)
}

removeAllFromCart=(item)=>{
  let cart=this.state.cart;
  if(cart[item.title]){
    delete cart[item.title];
  }
  this.setState({cart})
  localStorage.setItem("cart",JSON.stringify(cart))
  alert(`You removed all of ${item.title}s from your cart`)
}

clearCart=()=>{
  this.setState({cart:{}})
  localStorage.removeItem("cart")
}

  render() {
    return (
    <div>
        <NavBar token={this.state.token} getCartTotalPrice={this.getCartTotalPrice} getCartItemTotal={this.getCartItemTotal}/>
      <Switch>
        <ProtectedRoute exact path ="/shop" token={this.state.token} 
        render={()=><Shop addToCart={this.addToCart}/>}/>
        <ProtectedRoute exact path ="/edititems" token={this.state.token} 
        render={()=><EditItems/>}/>
        <ProtectedRoute exact path ="/createitems" token={this.state.token} 
        render={()=><CreateItems/>}/>
        <ProtectedRoute exact path ="/item/:id" token={this.state.token} 
        render={(props)=><SingleItem {...props}/>}/>
        <Route exact path = '/login' 
        render={()=><Login setToken={this.setToken}/>}/>
         <Route exact path ="/logout" token={this.state.token}
        render={()=><Logout doLogout={this.doLogout}/>}/>

      </Switch>
    </div>
    )
  }
}
