import React from 'react'
import { useEffect, useState } from "react";
import Axios from 'axios'
import Restro_Navbar from './Restro_Navbar';
import { Link } from 'react-router-dom';

const Restro_Dish = () => {
    const[dishInfo,setDishInfo]=useState([]);
    const[price,setPrice]=useState(0);

    useEffect(()=>{
        const url ="http://localhost:3002/getDishesByRestroMongo";
        Axios.post(url,{id:sessionStorage.getItem('restaurant_id')
        },).then((response)=>{
            setDishInfo(response.data);
        })
    },[])

    return (
        <div>
            <Restro_Navbar/>
            <h3>Our menu - </h3>
            {dishInfo.map((val,idx)=>{
                return (
                    <div key={idx}>
                        <br></br><img src={val.Dish_Image} />
                        <h3><strong>Dish : </strong><strong>{val.Dish_Name}</strong></h3>
                        
                        <h3><strong>Price : </strong><strong>{val.Dish_Price}</strong></h3>
                    
                        
                        <h3><strong>Description : </strong><strong>{val.Description}</strong></h3>

                        <h3><strong>Ingredients : </strong><strong>{val.Main_Ingredients}</strong></h3>

                        <h3><strong>Category : </strong><strong>{val.Dish_Category}</strong></h3> <br></br>

                        
                      
                        
                        
                    </div>
         
                        
                 );
                

             })}
            
        </div>
    )
}

export default Restro_Dish
