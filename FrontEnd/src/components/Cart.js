import React,{useState} from 'react'
import { Link,useHistory} from 'react-router-dom';
import {Modal, ModalBody, ModalFooter} from 'react-bootstrap';
// import "./Cart.css";
import '../App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { useSelector,useDispatch } from 'react-redux';
import { openModal } from '../Actions';
import { closeModal } from '../Actions';
import { addToCart } from '../Actions';
import { removeFromCart } from '../Actions';

const Cart = () => {
    let history=useHistory();
    const modalState = useSelector(state=>state.modalReducer);
    const dishArray=JSON.parse(sessionStorage.getItem('cart'));
    const dispatch = useDispatch();
    const[newDishArray,setNewDishArray]=useState(dishArray);
    const cartItems = useSelector(state=>state.cartReducer)
    


    const additem=(val)=>{
        const ifExist=newDishArray.find(dish=>dish.Dish_Name===val.Dish_Name);
        if(ifExist){
            const nextState = newDishArray.map((item)=>item.Dish_Name===val.Dish_Name?{
                ...ifExist,quantity:ifExist.quantity+1
            }:item)
            setNewDishArray(nextState);
            const existCart=JSON.parse(sessionStorage.getItem('cart'));
            const updatedCart = existCart.map((item)=>item.Dish_Name===val.Dish_Name?{
              ...ifExist,quantity:ifExist.quantity+1
          }:item)
          sessionStorage.setItem('cart',JSON.stringify(updatedCart));
        }
    }
     const removeitem=(val)=>{
        const ifExist=newDishArray.find(dish=>dish.Dish_Name===val.Dish_Name);
        if(ifExist){
            const nextState = newDishArray.map((item)=>(item.Dish_Name===val.Dish_Name && val.quantity>0) ?{
                ...ifExist,quantity:ifExist.quantity-1
            }:item)
            

            
            setNewDishArray(nextState);
            const existCart=JSON.parse(sessionStorage.getItem('cart'));
            const updatedCart = existCart.map((item)=>(item.Dish_Name===val.Dish_Name && val.quantity>0) ?{
              ...ifExist,quantity:ifExist.quantity-1
          }:item)
          sessionStorage.setItem('cart',JSON.stringify(updatedCart));
        }
       
    }
    var amount=0;
    cartItems.map((value)=>{
      amount= amount+value.Dish_Price*value.quantity;
      
    })
    sessionStorage.setItem('amount',JSON.stringify(amount));
    
    return (
        <div>
            <Modal show={modalState} onHide={()=>{dispatch(closeModal())}}>
                <ModalHeader style={{textAlign:"center"}}>
                <div style={{textAlign:"center"}} >
                    <h1>Your Cart</h1>
                </div>
                </ModalHeader>
                <ModalBody>
                    
                    {cartItems.length===0 && <div> Cart is Empty </div>}
                    {cartItems.filter(
                        (dish)=>{
                            if(dish.quantity > 0){
                                return dish;
                            }}
                    ).map((val,idx)=>{
            return (
                <div >
                    <h4>dish: <strong>{val.Dish_Name}</strong>   ||  qty: <strong>{val.quantity}</strong>   ||    price: <strong>{val.Dish_Price}</strong></h4>
                    <button onClick={()=>dispatch(addToCart(val))}>Add</button><br></br>
                    <button onClick={()=>dispatch(removeFromCart(val))}>Remove</button>
                    
                </div>
            );
            

        })}
        <div>
        <h4>Total Amount : {amount}</h4>
        </div>

                </ModalBody>
                <ModalFooter>
                    <div>
                    {/* <Link  to={{
                            pathname: "/checkout"
                            }}><button onClick={()=>{closeModal()
                            
                            }}>Go to checkout</button></Link> */}
                            <button onClick={
                                ()=>{
                                    dispatch(closeModal());
                                    history.push("/checkout")
                                }
                            }>Go to Checkout</button>
                    </div>
                </ModalFooter>

            </Modal>
            

            

        </div>
    )
}
 
export default Cart
