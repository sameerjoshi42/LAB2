import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import {Modal, ModalBody, ModalFooter} from 'react-bootstrap';
// import "./Cart.css";
import '../App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';


const Cart = ({setOpenModal,modalOpen}) => {
  
    const dishArray=JSON.parse(sessionStorage.getItem('cart'));
     
    const[newDishArray,setNewDishArray]=useState(dishArray);
    


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
    newDishArray.map((value)=>{
      amount= amount+value.Dish_Price*value.quantity;
      
    })
    sessionStorage.setItem('amount',JSON.stringify(amount));
    
    return (
        <div>
            <Modal show={modalOpen} onHide={()=>{setOpenModal(false)}}>
                <ModalHeader style={{textAlign:"center"}}>
                <div style={{textAlign:"center"}} >
                    <h1>Your Cart</h1>
                </div>
                </ModalHeader>
                <ModalBody>
                    
                    {newDishArray.length===0 && <div> Cart is Empty </div>}
                    {newDishArray.filter(val=>val.quantity>0).map((val,idx)=>{
            return (
                <div >
                    <h4>dish: <strong>{val.Dish_Name}</strong>   ||  qty: <strong>{val.quantity}</strong>   ||    price: <strong>{val.Dish_Price}</strong></h4>
                    <button onClick={()=>additem(val)}>Add</button><br></br>
                    <button onClick={()=>removeitem(val)}>Remove</button>
                    
                </div>
            );
            

        })}
        <div>
        <h4>Total Amount : {amount}</h4>
        </div>

                </ModalBody>
                <ModalFooter>
                    <div>
                    <Link  to={{
                            pathname: "/checkout"
                            }}><button>Go to checkout</button></Link>
                    </div>
                </ModalFooter>

            </Modal>
            

            

        </div>
    )
}
 
export default Cart
