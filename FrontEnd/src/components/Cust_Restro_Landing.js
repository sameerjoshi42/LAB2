import React from 'react'
import Navbar from './Navbar'
import { useEffect, useState } from "react";
import Axios from 'axios'
import '../App.css';
import { useSelector,useDispatch } from 'react-redux';
import Cart from './Cart';
import { addToCart } from '../Actions';
import { removeFromCart } from '../Actions';


const Cust_Restro_Landing = props => {
    
    const dispatch = useDispatch();
    const cartItems = useSelector(state=>state.cartReducer)
    var restro_id=props.location.id;
    sessionStorage.setItem('restroId',restro_id);
    sessionStorage.setItem('restroName',props.location.name);
    const [modalOpen, setModalOpen] = useState(false);
    const[restroDishes,setRestroDishes]=useState([])
    const [cart, setCart] = useState(
    []    
    );
   
    useEffect(()=>{
        const url ="http://localhost:3002/getDishesByRestroMongo";
        Axios.post(url,{id:sessionStorage.getItem('restroId')
        },).then((response)=>{
            setRestroDishes(response.data);
        })
    },[])

    // const addToCart =(val)=>{
    //     const exist = cart.find(dish=>dish.Dish_Name===val.Dish_Name)
    //     if(exist){
    //         const nextState = cart.map((item)=>item.Dish_Name===val.Dish_Name?{
    //             ...exist,quantity:exist.quantity+1
    //         }:item)
    //         setCart(nextState);
            
    //     }
    //     else{
    //         const newArray=[...cart,{...val,quantity:1}];
    //         setCart(newArray);
            
            
    //     }      
        

    // }
    
    sessionStorage.setItem('cart',JSON.stringify(cart))
    
    
   


    return (
        <div className="Cust_Cart">
            <Navbar/>
           

      {/* {modalOpen && <Cart setOpenModal={setModalOpen} cart={cart} />} */}
            
            <h3>Our menu - </h3>
            {restroDishes.map((val,idx)=>{
                return (
                    <div key={idx}>
                        <br></br><img alt="dishImage" src={val.Dish_Image} />
                        <h3><strong>Dish : </strong><strong>{val.Dish_Name}</strong></h3>
                        
                        <h3><strong>Price : </strong><strong>{val.Dish_Price}</strong></h3>
                        
                        <h3><strong>Description : </strong><strong>{val.Description}</strong></h3>

                        <button onClick={()=>dispatch(addToCart(val))}>Add to cart</button> <br></br>
                        
                      
                        
                    </div>
                );
                

            })}
            
        </div>
    )
}

export default Cust_Restro_Landing
