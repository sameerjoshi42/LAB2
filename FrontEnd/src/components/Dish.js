import React from 'react'
import { useEffect, useState } from "react";
import Axios from 'axios'
import Restro_Navbar from './Restro_Navbar';

const Dish = props => {
    const [image, setImage] = useState([]);
    const [imageName, setImageName] = useState([]);
    
    const[success,setSuccess]=useState('');
    let restro_data=sessionStorage.getItem('restro_name');
    const [data, setData] = useState({
        dishName:"",
        ingredients:"",
        price:"",
        description:"",
        category:""
    });

    const[DishInfo,setDishInfo]=useState([])
    // useEffect(()=>{
    //     const url ="http://localhost:3002/getDishDetails";
    //     Axios.post(url,{name:restro_data
    //     },).then((response)=>{
    //         setDishInfo(response.data);
    //     })
    // },[])

    function handleSubmit(e){
        const newData={...data};
        newData[e.target.id]=e.target.value;
        setData(newData);
    

    }
    const url="http://3.128.29.95:3002/addDishMongo";
    function submit(e){
        e.preventDefault();
        const DishInfos = new FormData();
        DishInfos.append("image",image);
        DishInfos.append("imageName",imageName);
        DishInfos.append("name",restro_data);
        DishInfos.append("dishname",data.dishName);
        DishInfos.append("ingredients",data.ingredients);
        DishInfos.append("price",data.price);
        DishInfos.append("description",data.description);
        DishInfos.append("category",data.category);
        DishInfos.append("id",sessionStorage.getItem('restaurant_id'));
        setData({
        dishName:"",
        ingredients:"",
        price:"",
        description:"",
        category:""
        }

        )
        setSuccess('Dish added successfully!!');
        Axios.post(url,DishInfos,{
            headers: {
                'content-type': 'multipart/form-data' // do not forget this 
               }
          
        }).then(()=>{
            
            console.log('success');

        });
        // setDishInfo([
        //     ...DishInfo,{
        //         Rest_Name:restro_data,
        //         Dish_Name:data.dishName,
        //         Main_Ingredients:data.ingredients,
        //         Dish_Price:data.price,
        //         Description:data.description,
        //         Dish_Category:data.category
        //     }
        // ]);

        //window.location.reload();
            

}
    
    return (
        <div>
            <Restro_Navbar/>
            {/* <h3>Welcome, <strong>{restro_data}</strong></h3> */}
            <form onSubmit={e=>submit(e)}>
                <div>
                    <h2><strong>Add a Dish</strong></h2>
                </div>

                <div>
                    <label htmlFor="dishName"><strong> Dish Name: </strong></label>
                    <input onChange={(e)=>handleSubmit(e)} id="dishName" value={data.dishName} type="text" required="required" name="dishName" placeholder="Enter dish 
                    name"/> 
                </div>
                <br></br>

                <div>
                    <label htmlFor="ingredients"><strong> Ingredients:</strong> </label>
                    <input onChange={(e)=>handleSubmit(e)} id="ingredients" value={data.ingredients} type="text" required="required" name="ingredients" placeholder="Enter main 
                    ingredients"/> 
                </div>
                <br></br>
                <div>
                    <label htmlFor="price"><strong>Price: </strong></label>
                    <input onChange={(e)=>handleSubmit(e)} id="price" value={data.price} type="text" required="required" name="price" placeholder="Enter dish price"/>
                </div>
                <br></br>
                <div>
                    <label htmlFor="description"><strong>Description: </strong></label>
                    <input onChange={(e)=>handleSubmit(e)} id="description" value={data.description} type="text" required="required" name="description" placeholder="Enter dish 
                    description"/>
                </div>
                <br></br>
                <div>
                    <label htmlFor="category"><strong>Category:</strong> </label>
                    <input onChange={(e)=>handleSubmit(e)} id="category" value={data.category} type="text" required="required" name="category" placeholder="Enter dish 
                    category"/>
                </div>
                <br></br>
                <div>
                          <label htmlFor="image"><strong>Upload Dish Picture:</strong></label>
                          <input type="file" name="image" onChange={(e)=>{
                              const img=e.target.files[0];
                              const img_Name=e.target.files[0].name;
                              setImage(img);
                              setImageName(img_Name);
                          }}   />
                        </div>
                <br></br>
                <div>
                    <button className="btn btn-primary sm m-5">submit</button><br></br>
                </div>
            </form>

            <div style={{width: "100%",float: "center",color:'green'}}>
                <h3>{success}</h3>
            </div>
           
          

     
            
        </div>
    )
}

export default Dish
