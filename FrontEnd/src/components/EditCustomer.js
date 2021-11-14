import React from 'react'
import { useEffect, useState } from "react";
import Axios from 'axios'
import Navbar from './Navbar';
const EditCustomer = (props) => {
    var city=props.location.city;
    var userId=props.location.id;
    const[newCity,setNewCity] = useState(city);
    const handleEdit = (e)=>{
        e.preventDefault();
            
            const url="http://18.222.207.218:3002/editCityMongo"
            Axios.post(url,{id:userId,
                updatedCity:newCity
             },).then((response)=>{
                    console.log(response);
                   });

    }

    return (
        <div>
             <Navbar/>
             <form >
            
                <div>
                    <h2>Edit City</h2>
                </div>

                <div style={{color:'black'}}>
                    <label htmlFor="newcity"><strong>City:</strong> </label>
                    <input id="newcity" onChange={(e)=>{
                        setNewCity(e.target.value);
                    }} type="text" value={newCity} required="required" name="email" placeholder="Enter new city"/> 
                </div>
                <br></br>
                
                
                <div>
                    <button onClick={(e)=>handleEdit(e)} className="btn btn-primary sm m-5">Edit</button>
                </div>
            </form><br></br>
            
        </div>
    )
}

export default EditCustomer
