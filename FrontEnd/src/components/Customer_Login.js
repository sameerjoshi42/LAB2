import React from 'react'
import {useState} from "react";
import {Link,useHistory } from 'react-router-dom';
import '../App.css'
import Axios from 'axios'
import jwt_decode from "jwt-decode";


const Customer_Login = () => {
    let history=useHistory();
    
    
    const [data, setData] = useState({
        custemail:"",
        password:"",
        token:""
     
    });
    // const[CustLocInfo,setCustLocInfo]=useState([])
    
    

    const[error,setError]=useState("");

    function handleSubmit(e){
        const newData={...data};
        newData[e.target.id]=e.target.value;
        setData(newData);
    

    }
    const Login=(userEmail,e)=>{
        e.preventDefault();
        
        const url="http://3.145.61.91:3002/login"
        Axios.post(url,{email:userEmail,
            password:data.password
            },).then((response)=>{
                localStorage.setItem('token',response.data);
                
                
                var decoded = jwt_decode(response.data.split(' ')[1]);
                sessionStorage.setItem('cust_id',decoded._id);
                sessionStorage.setItem('cust_name',decoded.name);
                    
                history.push("/customerLanding");
                
                
               
            }).catch(()=>{
                setError("Invalid Password or Email")
            })
    }
    return (
        <div>
            <div style={{width: "105%",float: "center",color:'red'}}>
                <h3>{error}</h3>
            </div>
            <form >
                <div>
                    <h2><strong>Customer Login</strong></h2>
                </div>

                <div className="login">
                    <label htmlFor="custemail"><strong>Customer Email:</strong> </label>
                    <input  id="custemail" onChange={(e)=>handleSubmit(e)}  type="email" value={data.custemail} required="required" name="custemail" value={data.custemail} placeholder="Enter your email"/> 
                
                <br></br>  <br></br>
                
                
                    <label htmlFor="password"><strong>Customer Password:</strong> </label>
                    <input id="password" type="password" onChange={(e)=>handleSubmit(e)} value={data.password} required="required" name="password" placeholder="Enter your password"/>
                </div>
                <br></br>
                <div>
                    <button onClick={(e)=>Login(data.custemail,e)} className="btn btn-primary sm m-5">Login</button>
                </div>
            </form><br></br>
            <ul>
        <li><Link to="/customerSignup"><strong>Don't have an account? SignUp</strong></Link></li> <br></br>
        
      </ul>
      
      
            
            
        </div>
    )
}

export default Customer_Login
