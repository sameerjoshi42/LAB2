import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import Axios from 'axios'
import Restro_Navbar from './Restro_Navbar';

const Restro_landing = props => {
    
    // const { name } =
    // (props.location && props.location.state) || {};
    // const[restroName,setRestroName]=useState("");
    // setRestroName({name});
    const[restroInfo,setRestroInfo]=useState([])

    useEffect(()=>{
        const url ="http://localhost:3002/getRestroDetailsMongo";
        Axios.post(url,{id:sessionStorage.getItem('restaurant_id')
        },).then((response)=>{
            setRestroInfo(response.data);
        }).catch(()=>{
            console.log('some error occurred!')
        })
    },[])
    var restaurant_name=sessionStorage.getItem('restro_name');
    
        // const url ="http://localhost:3002/getRestroDetails";
        // Axios.post(url,{restro_name:props.location.state.name
        // },).then((response)=>{
        //     setRestroInfo(response.data);
        // })
    


    

    

    return (
        <div>
            <Restro_Navbar/>
            {/* <h3>Hi, Welcome to Food Heaven, {name} !!</h3> */}
            {/* <h3>Welcome,{name}</h3> */}
            <h2> Your Profile:</h2>
            {restroInfo.map((val)=>{
                return (
                    <div >
                        <img src={val.Rest_Image} />
                        <h3><strong>Description : </strong><strong>{val.Rest_Desc}</strong></h3>
                        
                        <h3><strong>Location : </strong><strong>{val.Rest_Location}</strong></h3>
                        
                        <h3><strong>Contact : </strong><strong>{val.Rest_contact}</strong></h3>
                        
                        <h3><strong>Timings : </strong><strong>{val.Rest_Timings}</strong></h3>
                        
                    </div>
                );
                

            })}
            <Link  to={{
                            pathname: "/adddish",
                            restaurant_name
                            }}><strong>Add Dishes</strong></Link><br></br><br></br>
            {/* <Link to=""><button><strong>View your Dishes</strong></button></Link><br></br> */}
            



        </div>
    )
}

export default Restro_landing
