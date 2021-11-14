import React from 'react'
import { useEffect, useState } from "react";
import Axios from 'axios'

import Restro_Navbar from './Restro_Navbar';



const Restro_Customer_Profile = (props) => {
    let cust_id=props.location.state;
    const[CustInfo,setCustInfo]=useState([])
    useEffect(()=>{
        const url ="http://18.222.207.218:3002/getcustDetailsMongo";
        Axios.post(url,{id:cust_id
        },).then((response)=>{
            setCustInfo(response.data);
        })
    },[])
    return (
        <div>
            <Restro_Navbar/>
            {CustInfo.map((val)=>{
                return (
                    <div >
                        <div>
                            <img src={require=val.Cust_Image}></img>
                        </div>
                        <h3><strong>Name : </strong><strong>{val.Name}</strong></h3>
                        
                        <h3><strong>Email : </strong><strong>{val.Email}</strong></h3>
                        
                        <h3><strong>Favourite Restaurant : </strong><strong>{val.Fav_Restro}</strong></h3>
                        
                        <h3><strong>Birth Date : </strong><strong>{val.Birth_Date}</strong></h3>

                        <h3><strong>Contact Number : </strong><strong>{val.Phone}</strong></h3>

                        <h3><strong>City : </strong><strong>{val.City}</strong></h3>

                        <h3><strong>State : </strong><strong>{val.State}</strong></h3>

                        <h3><strong>Country : </strong><strong>{val.Country}</strong></h3>

                        <h3><strong>Nick Name : </strong><strong>{val.NickName}</strong></h3>
                        
                    </div>
                );
                

            })}
            
        </div>
    )
}

export default Restro_Customer_Profile
