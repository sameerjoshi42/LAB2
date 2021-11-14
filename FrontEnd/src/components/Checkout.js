import React from 'react'
import Navbar from './Navbar';
import {useEffect,useState} from "react";
import Axios from 'axios'
import { useSelector,useDispatch } from 'react-redux';
import { emptyCart } from '../Actions';
const Checkout = () => {
    const[address,setAddress]=useState("");
    const[allAddresses,setAllAddresses]=useState([]);
    const[radio,setRadio]=useState("");
    const[success,setSuccess]=useState('');
    const[instructions,setInstructions]=useState('');
    // var orderInfo=props.location.newDishArray;
    // var orderInfo=JSON.parse(sessionStorage.getItem('cart'));
    const dispatch = useDispatch();
    const orderInfo = useSelector(state=>state.cartReducer)
    useEffect(()=>{
        const url ="http://3.145.61.91:3002/getcustaddressesMongo";
        Axios.post(url,{id:sessionStorage.getItem('cust_id')
        },).then((response)=>{
             setAllAddresses(response.data);
        })
    },[])
    const saveAddress = ()=>{
        
        setAllAddresses([...allAddresses,{address}]);
        window.location.reload();
        
            const url ="http://3.145.61.91:3002/addaddressMongo";
            Axios.post(url,{id:sessionStorage.getItem('cust_id'),address:address
            },).then(()=>{
                console.log('success');
            })
        
       
    }

    const placeOrder = (e)=>{
        var data="";
        e.preventDefault();
        const url ="http://3.145.61.91:3002/placeOrderMongo";
        var dt = new Date();
        var year = dt.getFullYear();
        var month = dt.getMonth()+1;
        var day=dt.getDate();
        const finalDate= JSON.stringify(day) +"-"+ JSON.stringify(month)+"-"+ JSON.stringify(year);
        var hour = dt.getHours();
        var min = dt.getMinutes();
        const time=JSON.stringify(hour)+":"+JSON.stringify(min);
        const restro_name= sessionStorage.getItem('restroName');
        const cust_name= sessionStorage.getItem('cust_name');
        const billAmount= sessionStorage.getItem('amount');
        setSuccess('Order placed successfully!!');
        Axios.post(url,{cust_name:cust_name,
            cust_id:sessionStorage.getItem('cust_id'),
            address:radio,
            restro_name:restro_name,
            restro_id:sessionStorage.getItem('restroId'),
            time:time,
            date:finalDate,
            amount:billAmount,
            status:"Order Placed",
            delivery_instructions:instructions
            },).then(async(response)=>{
                console.log(response.data);
                data = await response.data;
                Axios.post('http://3.145.61.91:3002/saveOrderDetailsMongo',{
                    order_id:data,
                    order_details:orderInfo
                    
                }).then(()=>{
                    console.log('success');
                    var newOrderInfo=[]
                    //sessionStorage.setItem('cart',JSON.stringify(orderInfo));
                    dispatch(emptyCart(newOrderInfo));
                })
            })
        


    }
    return (
        <div>
            <Navbar/>
            <h3> Order Summary: </h3>
            <h4>------------------------------------------------------</h4>
            {orderInfo.filter((dish)=>{
                if(dish.quantity > 0){
                    return dish;
                }

            }).map((val,idx)=>{
                return(
                    <div>
                        
                        <h4>Dish: <strong>{val.Dish_Name}</strong></h4>
                        <h4>Quantity: <strong>{val.quantity}</strong></h4>
                        <h4>Price: <strong>{val.Dish_Price}</strong></h4>
                        <h4>------------------------------------------------------</h4>
                        

                    </div>
                )

            })}
                    <div>
                    <h4>Final Amount: {JSON.parse(sessionStorage.getItem('amount'))}</h4>
                    </div>
                    <div>
                        <label htmlFor="address:"><strong>Add a new delivery address or choose from exisiting address:-</strong></label><br></br><br></br>
                        <input id="address" name="address" value={address} onChange={
                            (e)=>{
                                setAddress(e.target.value);
                            }
                        } placeholder="Enter delivery address"/> 
                          <button onClick={(e)=>saveAddress(e)
                            }>Add Address</button>
                        <br></br><br></br>
                       
            {allAddresses.map((data)=>{
                return (
                    <div >
                        <label htmlFor="address">{data.Cust_Address}</label>
                        <input id="address" type="radio" value={data.Cust_Address} checked={radio===data.Cust_Address} onChange={(e)=>setRadio(e.target.value)}  /><br></br>
                        </div> 
                );
                

            })}<br></br>
                   <div>
                   <label htmlFor="instructions"><strong>Add special instructions:-</strong></label><br></br><br></br>
                   <input id="instructions" type="text" value={instructions} onChange={
                       (e)=>{setInstructions(e.target.value);}
                   } placeholder="Enter delivery instructions"/>

                   </div> <br></br>
                        <button onClick={(e)=>{
                            placeOrder(e);
                        }}> Place Order</button>
            </div>
            <div style={{width: "100%",float: "center",color:'green'}}>
                <h3>{success}</h3>
            </div>
        </div>
    )
}

export default Checkout
