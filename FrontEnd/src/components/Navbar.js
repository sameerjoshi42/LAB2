
import React from 'react'
import '../App.css';
import {useState } from "react";
import Cart from './Cart';
import { Modal } from 'react-bootstrap';

const Navbar = (props) => {
    const[search,setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    
    
    
    
   
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
                <button onClick={() => {setModalOpen(true);
                 }}> Cart</button>
                

                
                
                

            </div>
            <div>
                
            </div>
            
        </div>
        {modalOpen && <Cart setOpenModal={setModalOpen} modalOpen={modalOpen} />}
        </div>
        
    )
}

export default Navbar
