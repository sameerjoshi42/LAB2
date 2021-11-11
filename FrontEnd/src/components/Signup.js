import React, { useState } from "react";
import Axios from 'axios'
import { Link } from 'react-router-dom';


const Signup = () => {
    const options = [
        'United States', 'India', 'Mexico','Canada'
      ];
      const defaultOption = options[0];
      const [image, setImage] = useState([]);
      const [imageName, setImageName] = useState([]);
    
      const[success,setSuccess]=useState("");
    const url="http://localhost:3002/custsignupmongo";
    const [data, setData] = useState({
        name:"",
        email:"",
        password:"",
        fav_restro:"",
        birth_date:"",
        phone_no:"",
        city:"",
        state:"",
        country:"",
        nickname:""
    },);
    function handleSubmit(e){
        const newData={...data};
        newData[e.target.id]=e.target.value;
        setData(newData);
        //console.log(newData);

    }
    function submit(e){
        e.preventDefault();
        const customerInfo = new FormData();
        customerInfo.append("image",image);
        customerInfo.append("imageName",imageName);
        customerInfo.append("name",data.name);
        customerInfo.append("email",data.email);
        customerInfo.append("password",data.password);
        customerInfo.append("fav_restro",data.fav_restro);
        customerInfo.append("birth_date",data.birth_date);
        customerInfo.append("phone_no",data.phone_no);
        customerInfo.append("city",data.city);
        customerInfo.append("state",data.state);

        customerInfo.append("country",data.country);
        customerInfo.append("nickname",data.nickname);
        setSuccess('Signed Up successfully!! Please proceed to login!')
        
        Axios.post(url,customerInfo,{
            headers: {
             'content-type': 'multipart/form-data' // do not forget this 
            }}
            // {
            // name:data.name,
            // email:data.email,
            // password:data.password,
            // fav_restro:data.fav_restro,
            // birth_date:data.birth_date,
            // phone_no:data.phone_no,
            // city:data.city,
            // state:data.state,
            // country:data.country,
            // nickname:data.nickname
            // }        
            
    ,).then(()=>{
            alert('Success!');
        })

    }
    return (
        <div>
            <form onSubmit={e=>submit(e)}>
                <div>
                    <h2>Sign Up</h2>
                </div>

                <div>
                    <label htmlFor="name"><strong>Customer Name: </strong></label>
                    <input onChange={(e)=>handleSubmit(e)} id="name" value={data.name} type="text" required="required" name="name" placeholder="Enter your name"/> 
                </div>
                <br></br>
                <div>
                    <label htmlFor="email"><strong>Customer Email:</strong> </label>
                    <input onChange={(e)=>handleSubmit(e)} id="email" value={data.email} type="email" required="required" name="email" placeholder="Enter your email"/>
                </div>
                <br></br>
                <div>
                    <label htmlFor="password"><strong>Customer Password: </strong></label>
                    <input onChange={(e)=>handleSubmit(e)} id="password" value={data.password} type="password" required="required" name="password" placeholder="Enter your password"/>
                </div>
                <br></br>
                <div>
                    <label htmlFor="fav_restro"><strong>Favourites: </strong></label>
                    <input onChange={(e)=>handleSubmit(e)} id="fav_restro" value={data.fav_restro} type="text" required="required" name="fav_restro" placeholder="Enter your favourites"/> 
                </div>
                <br></br>
                <div>
                    <label htmlFor="birth_date"><strong>Birth Date: </strong></label>
                    <input onChange={(e)=>handleSubmit(e)} id="birth_date" value={data.birth_date} type="text" required="required" name="birth_date" placeholder="Enter your birth date"/> 
                </div>
                <br></br>
                <div>
                    <label htmlFor="phone_no"><strong>Contact Number: </strong></label>
                    <input onChange={(e)=>handleSubmit(e)} id="phone_no" value={data.phone_no} type="text" required="required" name="phone_no" placeholder="Enter your contact number"/> 
                </div>
                <br></br>
                <div>
                    <label htmlFor="city"><strong>City: </strong></label>
                    <input onChange={(e)=>handleSubmit(e)} id="city" value={data.city} type="text" required="required" name="city" placeholder="Enter your city"/> 
                </div>
                <br></br>
                <div>
                    <label htmlFor="state"><strong>State: </strong></label>
                    <input onChange={(e)=>handleSubmit(e)} id="state" value={data.state} type="text" required="required" name="state" placeholder="Enter your state"/> 
                </div>
                <br></br>
                <div>
                <label for="countrty"><strong>Choose a country:</strong></label>
                <select id="country" name="country" onChange={(e)=>handleSubmit(e)} value={data.country}>
                    <option value="US">United States</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                    </select>

                </div>
                <br></br>
                <div>
                    <label htmlFor="nickname"><strong>Nick Name: </strong></label>
                    <input onChange={(e)=>handleSubmit(e)} id="nickname" value={data.nickname} type="text" required="required" name="nickname" placeholder="Enter your nickname"/> 
                </div>
                <br></br>
                <div>
                          <label htmlFor="image"><strong>Upload Profile Picture:</strong></label>
                          <input type="file" name="image" onChange={(e)=>{
                              const img=e.target.files[0];
                              const img_Name=e.target.files[0].name;
                              setImage(img);
                              setImageName(img_Name);
                          }}  required />
                        </div>
                <br></br>
               
                <br></br>                   
                <div>
                    <button className="btn btn-primary sm m-5">submit</button>
                </div>

                <div style={{width: "100%",float: "center",color:'green'}}>
                <h3>{success}</h3>
            </div>
            </form><br></br>

            <Link to="/customer"><strong>Have an account? Login</strong></Link> <br></br>
            
            
        </div>
    )
}

export default Signup
