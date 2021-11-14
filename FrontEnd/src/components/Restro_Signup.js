import React, {useState } from "react";
import Axios from 'axios'
import { Link } from 'react-router-dom';

const Restro_Signup = () => {
    const [image, setImage] = useState([]);
    const [imageName, setImageName] = useState([]);
    const[success,setSuccess]=useState("");
    const url="http://3.128.29.95:3002/restrosignupmongo";
    const [data, setData] = useState({
        rest_name:"",
        rest_email:"",
        rest_password:"",
        rest_location:"",
        rest_desc:"",
        rest_time:"",
        rest_contact:"",
        delivery:"",
        pickup:"",
        veg:"",
        nonveg:"",
        vegan:""
        


    },);
    function handleSubmit(e){
        const newData={...data};
        newData[e.target.id]=e.target.value;
        setData(newData);
        console.log(newData);

    }
    function submit(e){
        e.preventDefault();
        const RestroInfo = new FormData();
        RestroInfo.append("image",image);
        RestroInfo.append("imageName",imageName);
        RestroInfo.append("rest_name",data.rest_name);
        RestroInfo.append("rest_email",data.rest_email);
        RestroInfo.append("rest_password",data.rest_password);
        RestroInfo.append("rest_location",data.rest_location);
        RestroInfo.append("rest_desc",data.rest_desc);
        RestroInfo.append("rest_time",data.rest_time);
        RestroInfo.append("rest_contact",data.rest_contact);
        RestroInfo.append("delivery",data.delivery);
        RestroInfo.append("pickup",data.pickup);
        RestroInfo.append("veg",data.veg);
        RestroInfo.append("nonveg",data.nonveg);
        RestroInfo.append("vegan",data.vegan);
        setSuccess('Signed Up successfully!! Please proceed to login!')
        Axios.post(url,RestroInfo,{
            headers: {
                'content-type': 'multipart/form-data' // do not forget this 
               }
        },).then(res=>{
            console.log(res.data);
        })

    }
    return (
        <div>
            <form onSubmit={e=>submit(e)}>
                <div>
                    <h2>Sign Up</h2>
                </div>

                <div>
                    <label htmlFor="rest_name"><strong>Restaurant Name: </strong></label>
                    <input onChange={(e)=>handleSubmit(e)} id="rest_name" value={data.rest_name} type="text" required="required" name="name" placeholder="Enter your name"/> 
                </div>
                <br></br>
                <div>
                    <label htmlFor="rest_email"><strong>Restaurant Email:</strong> </label>
                    <input onChange={(e)=>handleSubmit(e)} id="rest_email" value={data.rest_email} type="email" required="required" name="email" placeholder="Enter your email"/>
                </div>
                <br></br>
                <div>
                    <label htmlFor="rest_password"><strong>Restaurant Password: </strong></label>
                    <input onChange={(e)=>handleSubmit(e)} id="rest_password" value={data.rest_password} type="password" required="required" name="password" placeholder="Enter your password"/>
                </div>
                <br></br>
                <div>
                    <label htmlFor="rest_location"><strong>Restaurant Location: </strong></label>
                    <input onChange={(e)=>handleSubmit(e)} id="rest_location" value={data.rest_location} type="text" required="required" name="rest_location" placeholder="Enter your location"/>
                </div>
                <br></br>
                <div>
                    <label htmlFor="rest_desc"><strong>Restaurant Description:</strong> </label>
                    <input onChange={(e)=>handleSubmit(e)} id="rest_desc" value={data.rest_desc} type="text" required="required" name="rest_desc" placeholder="Enter Description"/>
                </div>
                <br></br>
                <div>
                    <label htmlFor="rest_time"><strong>Restaurant Timings:</strong></label>
                    <input onChange={(e)=>handleSubmit(e)} id="rest_time" value={data.rest_time} type="text" required="required" name="rest_time" placeholder="Enter Timings"/>
                </div>
                <br></br>
                <div>
                    <label htmlFor="rest_contact"><strong>Restaurant Contact:</strong> </label>
                    <input onChange={(e)=>handleSubmit(e)} id="rest_contact" value={data.rest_contact} type="text" required="required" name="rest_contact" placeholder="Enter Contact"/>
                </div>
                <br></br>
                <div>
                          <label htmlFor="image"><strong>Upload Restaurant Picture:</strong></label>
                          <input type="file" name="image" onChange={(e)=>{
                              const img=e.target.files[0];
                              const img_Name=e.target.files[0].name;
                              setImage(img);
                              setImageName(img_Name);
                          }}   />
                        </div>
                <br></br>
                <br></br>
                <div>
                <label for="delivery"><strong>Home Delivery:</strong></label>
                <select id="delivery" name="delivery" onChange={(e)=>handleSubmit(e)} value={data.delivery}>
                    <option value="select" selected>Select</option>
                    <option value="T">Yes</option>
                    <option value="F">No</option>
                    
                    </select>

                </div>
                <br></br>

                <div>
                <label for="pickup"><strong>Pickup:</strong></label>
                <select id="pickup" name="pickup" onChange={(e)=>handleSubmit(e)} value={data.pickup}>
                    <option value="select" selected>Select</option>
                    <option value="T">Yes</option>
                    <option value="F">No</option>
                    
                    </select>

                </div>
                <br></br>

                <div>
                <label for="veg"><strong>Veg meal:</strong></label>
                <select id="veg" name="veg" onChange={(e)=>handleSubmit(e)} value={data.veg}>
                    <option value="select" selected>Select</option>
                    <option value="T">Yes</option>
                    <option value="F">No</option>
                    
                    </select>

                </div>
                <br></br>

                <div>
                <label for="nonveg"><strong>Non-Veg meal:</strong></label>
                <select id="nonveg" name="nonveg" onChange={(e)=>handleSubmit(e)} value={data.nonveg}>
                    <option value="select" selected>Select</option>
                    <option value="T">Yes</option>
                    <option value="F">No</option>
                    
                    </select>

                </div>
                <br></br>

                <div>
                <label for="vegan"><strong>Vegan meal:</strong></label>
                <select id="vegan" name="vegan" onChange={(e)=>handleSubmit(e)} value={data.vegan}>
                    <option value="select" selected>Select</option>
                    <option value="T">Yes</option>
                    <option value="F">No</option>
                    
                    </select>

                </div>
                <br></br>
                <div>
                    <button className="btn btn-primary sm m-5">submit</button><br></br>
                </div>
                <div style={{width: "100%",float: "center",color:'green'}}>
                <h3>{success}</h3>
            </div>
            </form><br></br>
            <Link to="/restaurant"><strong>Have an account? Login</strong></Link> <br></br>
            
        </div>
    )
}

export default Restro_Signup
