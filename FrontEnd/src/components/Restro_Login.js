import React from 'react'
import { Link,useHistory } from 'react-router-dom';

import {useState } from "react";

import Axios from 'axios'
import jwt_decode from "jwt-decode";


const Restro_Login = () => {
    let history=useHistory();
    const[error,setError]=useState("");
    const [state, setState] = useState({
        email: "",
        password:""
        });
 
    
    
    function handleSubmit(e){
        const newData={...state};
        newData[e.target.id]=e.target.value;
        setState(newData);
        //console.log(newData);
    
        }

        const Login=(userEmail,e)=>{
            e.preventDefault();
            
            const url="http://3.145.61.91:3002/restroLoginMongo"
            Axios.post(url,{email:userEmail,
                password:state.password

                },).then((response)=>{

                    localStorage.setItem('token',response.data);
                
                
                    var decoded = jwt_decode(response.data.split(' ')[1]);
                    sessionStorage.setItem('restaurant_id',decoded._id);
                    sessionStorage.setItem('restro_name',decoded.name);

                    // console.log(response.data[0].Rest_Password);
                   // res = response.data;
                   // console.log(res);
                    // if(response.data[0].Rest_Password===state.password){
                    //     console.log('inside');
                    //     sessionStorage.setItem('restaurant_id',response.data[0]._id)
                    //     sessionStorage.setItem('restro_name',response.data[0].Rest_Name)
                        history.push("/restroLanding");
                    // }
                    // else{
                    //     setError('Invalid Credentials');
                    // }
                   
                }).catch(()=>{
                    setError('Invalid UserName or Password!!');
                })
    
        }
    
    return (
        <div>
            <form >
            <div style={{width: "105%",float: "center",color:'red'}}>
                <h3>{error}</h3>
            </div>
                <div>
                    <h2>Restaurant Login</h2>
                </div>

                <div style={{color:'black'}}>
                    <label htmlFor="email"><strong>Restaurant Email:</strong> </label>
                    <input id="email" onChange={(e)=>handleSubmit(e)} type="email" value={state.email} required="required" name="email" placeholder="Enter your email"/> 
                </div>
                <br></br>
                
                <div>
                    <label htmlFor="password"><strong>Restaurant Password:</strong></label>
                    <input id="password" type="password" required="required" onChange={(e)=>handleSubmit(e)} value={state.password} name="password" placeholder="Enter your password"/>
                </div>
                <br></br>
                <div>
                    <button onClick={(e)=>Login(state.email,e)} className="btn btn-primary sm m-5">Login</button>
                </div>
            </form><br></br>
            <ul>
        <li><Link to="/restaurantSignup"><strong>Don't have an account? SignUp</strong></Link></li> <br></br>
        
      </ul>
      
            
        </div>
    )
}

export default Restro_Login
