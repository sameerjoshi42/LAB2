import React from 'react'
import { useEffect, useState } from "react";
import Axios from 'axios'
import Navbar from './Navbar';
import { Link,useHistory} from 'react-router-dom';



const Customer_Profile = () => {
    let cust_id=sessionStorage.getItem('cust_id');
    const[CustInfo,setCustInfo]=useState([])
    useEffect(()=>{
        const url ="http://18.222.207.218:3002/getcustDetailsMongo";
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        Axios.post(url,{id:cust_id
        },).then((response)=>{
            setCustInfo(response.data);
        })
    },[])
    return (
        <div>
            <Navbar/>
            {CustInfo.map((val)=>{
                return (
                    <div >
                        <div>
                            <img src={require=val.Cust_Image}></img>
                        </div>
                        <h3><strong>Name : </strong><strong>{val.Name}</strong></h3> <br></br>
                        <button> Edit </button><br></br>
                        <h3><strong>Email : </strong><strong>{val.Email}</strong></h3><br></br>
                        <button> Edit </button><br></br>
                        <h3><strong>Favourite Restaurant : </strong><strong>{val.Fav_Restro}</strong></h3><br></br>
                        <button> Edit </button><br></br>
                        <h3><strong>Birth Date : </strong><strong>{val.Birth_Date}</strong></h3><br></br>
                        <button> Edit </button><br></br>
                        <h3><strong>Contact Number : </strong><strong>{val.Phone}</strong></h3><br></br>
                        <button> Edit </button><br></br>
                        <h3><strong>City : </strong><strong>{val.City}</strong></h3><br></br>
                        <Link  to={{
                            pathname: "/editcustomer",
                            city:val.City,id:val._id
                            }}><button> Edit </button></Link><br></br>
                        <h3><strong>State : </strong><strong>{val.State}</strong></h3><br></br>
                        <button> Edit </button><br></br>
                        <h3><strong>Country : </strong><strong>{val.Country}</strong></h3><br></br>
                        <button> Edit </button><br></br>
                        <h3><strong>Nick Name : </strong><strong>{val.NickName}</strong></h3><br></br>
                        
                    </div>
                );
                

            })}

            
            
        </div>
    )
}

export default Customer_Profile
