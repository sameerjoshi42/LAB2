import React from 'react'

import Axios from 'axios'
import Navbar from './Navbar';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
const Favourites = () => {
    
    
    const[fav,setFav]=useState([])

    
        
        useEffect(()=>{
            const url ="http://3.145.61.91:3002/getFavMongo";
            Axios.post(url,{id:
                sessionStorage.getItem('cust_id')
            }).then((response)=>{
                setFav(response.data);
            })
        },[])
    

    
    return (
        <div>
            <Navbar/>
            <h2>Recently added....</h2>
            {fav.map((val)=>{
                            return (
                                <div >
                                    
                                    <img alt="restroImage" src={val.Restro_Image} />
                                    {/* <h3><strong>Name : </strong>
                                   <strong>{val.Restro_Name}</strong>
                                    </h3> */}
                                    <h3><strong>Name : </strong>
                                    <Link  to={{
                                    pathname: "/viewrestro",
                                    id:val.RestaurantId,name:val.Restaurant_Name
                                    }}><strong>{val.Restaurant_Name}</strong></Link>
                    </h3>
                                    
                                    <br></br>
                                    </div>
             ) })}

            
        </div>
    )
}



export default Favourites
