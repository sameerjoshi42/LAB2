
import React from 'react'
import '../App.css';
import {useState } from "react";
import Cart from './Cart';
import { useSelector,useDispatch } from 'react-redux';
import { openModal } from '../Actions';
import { closeModal } from '../Actions';
const Navbar = (props) => {

    const modalState = useSelector(state=>state.modalReducer);
    const[search,setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    
    
    return (
        <div>
        <div className="Navbar">
            <div className="customerName"><h3 >Welcome {sessionStorage.getItem('cust_name') } </h3> <br></br></div>
            
            <div className="leftSide">
                
                <div className="links">
                    <a href="/customerLanding">Home</a>
                    <a href="/customerProfile">Profile</a>
                    <a href="/favourites">Favourites</a>
                    <a href="/orders">Orders</a>
                    
                </div>

            </div>
            <div className="rightSide">
                <input type="text" onChange={(e)=>setSearch(e.target.value)} placeholder="what are you craving...." />
                <button onClick={()=>props.sendSearch(search)}>Search</button>
                <br></br>
                
                
                <a href="/" onClick={()=>{
                    var token=localStorage.getItem('token');
                    token="";
                    localStorage.setItem('token',token);
                }}>Logout</a>
                <button onClick={() => {dispatch(openModal());
                 }}> Cart</button>
                

                
                
                

            </div>
            <div>
                
            </div>
            
        </div>
        {modalState && <Cart/>}
        </div>
        
    )
}

export default Navbar
