import React from 'react'

import Navbar from './Navbar';
import { useEffect, useState } from "react";
import Axios from 'axios'
import { Link } from 'react-router-dom';
import "./cust_landing.css";

const CustomerLanding = () => {

    // const restroMap = new Map();
    
    const[RestroInfo,setRestroInfo]=useState([])

    const[CustLocInfo,setCustLocInfo]=useState([])
    const[search,setSearch]=useState("")
    const[radio,setRadio]=useState("");
    
    
    useEffect(()=>{
        const url ="http://localhost:3002/getCustLocationMongo";
        // Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        Axios.post(url,{id:sessionStorage.getItem('cust_id')
        },).then((response)=>{
            // setCustLocInfo(response.data);
            sessionStorage.setItem('cust_location',response.data);
        })
    },[])
    
    const addtoFav=(value)=>{
        const url="http://localhost:3002/addtofavMongo";
        Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        Axios.post(url,{
            id:sessionStorage.getItem('cust_id'),
            rest_image:value.Rest_Image,
            rest_id:value._id,
            rest_name:value.Rest_Name
            
        }).then(()=>{
            console.log('success');
        })

    }

    
    useEffect(()=>{
        Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        const url ="http://localhost:3002/getAllRestaurantsMongo";
        Axios.get(url).then((response)=>{
            setRestroInfo(response.data);
        })
    },[])
    
        var custLocRestro=RestroInfo.filter(val=>val.Rest_Location===sessionStorage.getItem('cust_location'));
        var notCustLocRestro=RestroInfo.filter(val=>val.Rest_Location!==sessionStorage.getItem('cust_location'));
        if(custLocRestro){
            custLocRestro.push(...notCustLocRestro);
        }
        else{
            var custLocRestro=[];
            custLocRestro.push(...notCustLocRestro);
        }
    
   

    
   return (
        <div className="cust_landing">
            
            <Navbar sendSearch={word=>{setSearch(word)}}/>
            <div className="radio__filter">
                <label htmlFor="veg">Veg </label>
                <input id="veg" type="radio" value="veg" checked={radio==="veg"} onChange={(e)=>setRadio(e.target.value)}/>
                <label htmlFor="nonveg">Non-Veg</label>
                <input id="nonveg" type="radio" value="nonveg" checked={radio==="nonveg"} onChange={(e)=>setRadio(e.target.value)}/>
                <label htmlFor="vegan">Vegan</label>
                <input id="vegan" type="radio" value="vegan" checked={radio==="vegan"} onChange={(e)=>setRadio(e.target.value)}/>
                <button onClick={()=>setRadio("")}>Reset</button>

            </div>
            
           {custLocRestro.filter((val)=>{
                if(radio==="veg"){
                    
                    if(val.Veg==='T'){
                        
                        return val;
                                }
                
                            }
                else if(radio==="nonveg"){
                    if(val.Non_Veg==='T'){
                        
                        return val;
                                }
                
                            }
                else if(radio==="vegan"){
                    if(val.Vegan==='T'){
                        
                        return val;
                                }
                
                            }
                else if(search===""){
                   return val;
               }
              else if(val.Rest_Name.toLowerCase().includes(search.toLowerCase())){
                    return val;
               }
              else if(val.Rest_Location.toLowerCase().includes(search.toLowerCase())){
                return val;
           }
              else if(search.toLowerCase()==='delivery'){
                 if(val.Rest_Deliver==='T'){
                     return val;

                 }
             }
              else if(search.toLowerCase()==='pickup'){
                if(val.Rest_pickup==='T'){
                    return val;

                }
            }

        
        }).map
           ((val)=>{
            return (
                <div >
                    
                    <br></br><img src={val.Rest_Image} />
                    <h3><strong>Name : </strong>
                    <Link  to={{
                            pathname: "/viewrestro",
                            id:val._id,name:val.Rest_Name
                            }}><strong>{val.Rest_Name}</strong></Link>
                    </h3>
                    
                    <h3><strong>Description : </strong><strong>{val.Rest_Desc}</strong></h3>
                    
                    <h3><strong>Location : </strong><strong>{val.Rest_Location}</strong></h3>
                    <br></br>
                    <div >
                    <button onClick={()=>addtoFav(val)}><strong>
                                Add to Favourites</strong></button>
                    
                    
            </div>
                    
                    
                    
                  
                </div>
            );
            

        })}
  
        

            
        </div>
    )
}

export default CustomerLanding
