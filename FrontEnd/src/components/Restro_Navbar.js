
import React from 'react'
import '../App.css';
//import { useEffect, useState } from "react";


const Restro_Navbar = () => {
  
    
    return (
        <div>
        <div className="Navbar">
            <div className="RestroName"><h3 >Welcome {sessionStorage.getItem('restro_name') } </h3> <br></br></div>
            
            <div className="leftSide">
                
                <div className="links">
                    <a href="/restroLanding">Home</a>
                    
                    <a href="/restroorders">Orders</a>
                    <a href="/restrodishes">Dishes</a>
                    
                </div>

            </div>
            <div className="rightSide">
            <a href="/" onClick={()=>{
                    var token=localStorage.getItem('token');
                    token="";
                    localStorage.setItem('token',token);
                }}>Logout</a>
                
            </div>
            
            
        </div>
        
        </div>
        
    )
}

export default Restro_Navbar

