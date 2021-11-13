import React from 'react'
import {useEffect, useState } from "react";
import Axios from 'axios'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom';
import {Modal, ModalBody} from 'react-bootstrap';
import '../App.css'
import Restro_Navbar from './Restro_Navbar';


const Restro_Order = () => {
    const restro_name=sessionStorage.getItem('restro_name')
    const[orderInfo,setOrderInfo]=useState([]);
    const[dropDown,setDropDown]=useState("");
    const[radio,setRadio]=useState("");
    const [orderDetails,setOrderDetails]=useState([]);
    const[orderid,setOrderId] = useState(0);
    const[openModal,setOpenModal]=useState(false);
    const[billAmount,setBillAmount]=useState(0);
    const[specialInstructions,setSpecialInstructions]=useState("");
  

    useEffect(()=>{
        const url ="http://localhost:3002/getRestroOrderDetailsMongo";
        Axios.post(url,{restro_id:sessionStorage.getItem('restaurant_id')
        },).then((response)=>{
            setOrderInfo(response.data);
        })
    },[])
    const viewDetails=(id,amount,instructions)=>{
        setOrderId(id);
        const url ="http://localhost:3002/viewOrderDetailsByIdMongo";
        Axios.post(url,{order_Id:id
        },).then((response)=>{
            setOrderDetails(response.data);
            setBillAmount(amount);
            setSpecialInstructions(instructions);
            setOpenModal(true);
            
            
        })
        

        
    }

    const updateStatus=(dropdown,id)=>{
        const url ="http://localhost:3002/updateOrderStatusMongo";
        Axios.post(url,{status:dropdown,
            order_id:id
        },).then(()=>{
            console.log('success');
            window.location.reload();
        })

    }

    
       

    return (
        
        <div>
            <Restro_Navbar/>
            <h3> Orders Summary..........</h3> <br></br>
            <div className="radio__filter">
                <label htmlFor="neworder">New Order </label>
                <input id="neworder" type="radio" value="order placed" checked={radio==="order placed"} onChange={(e)=>setRadio(e.target.value)}/>
                <label htmlFor="delivered">Delivered</label>
                <input id="delivered" type="radio" value="delivered" checked={radio==="delivered"} onChange={(e)=>setRadio(e.target.value)}/>
                <label htmlFor="cancelled">Cancelled</label>
                <input id="cancelled" type="radio" value="cancelled" checked={radio==="cancelled"} onChange={(e)=>setRadio(e.target.value)}/>
                <button onClick={()=>setRadio("")}>Reset</button>

            </div> <br></br>
            <div className="table">
            <Table >
                <thead>
                    <tr>
                        
                        <th>Customer Name</th>
                        <th>Order Date</th>
                        <th>Order Time</th>
                        <th>Order Status</th>
                        <th>Update Status</th>
                        <th>Order Details</th>
                        <th>Save</th>
                    </tr>
                </thead>
                <tbody>
                {orderInfo.filter((data)=>{
                    if(radio==""){
                        return data;
                    }
                    else if(radio=="order placed"){
                        if(data.Order_Status=="Order Placed"){
                            return data;
                        }

                    }
                    else if(radio=="delivered"){
                        if(data.Order_Status=="Delivered"){
                            return data;
                        }

                    }

                    else if(radio=="cancelled"){
                        if(data.Order_Status=="Cancelled"){
                            return data;
                        }

                    }
                })
                .map((val,idx)=>{
                return(
                    
                    <tr>
                        <Link to={{
                            pathname:"/restrocustprofile",
                            state:val.Cust_Id
                        }
                        
                        }><td>{val.Cust_Name}</td></Link>
                        <td>{val.Order_Date}</td>
                        <td>{val.Order_Time}</td>
                        <td>{val.Order_Status}</td>
                        <div key={idx}>
                        <td>
                        <select name="status" id="status" onChange={(e)=>setDropDown(e.target.value)} >
                            <option value="select" selected>Select</option>
                            <option value="In the Kitchen">In the Kitchen</option>
                            <option value="On the way">On the way</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancel</option>
                        </select>
                        </td>
                        </div>
                        <td><button onClick={()=>viewDetails(val._id,val.Order_Amount,val.Order_Instructions)}>View Details</button></td>
                        <td><button onClick={()=>updateStatus(dropDown,val._id)}>Save</button></td>

                    </tr>
                    
                )
            })}
                </tbody>
            </Table>
            </div>
            <Modal show={openModal} onHide={()=>{setOpenModal(false)}}>
                    <Modal.Header>
                    <div style={{paddingLeft:"220px"}}>
                        <h4>Order Summary</h4>
                    </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                        {orderDetails.filter((value)=>{
                            if(value.Quantity>0){
                            return value;
                }

            }).
            map((value)=>{
                return(
                    <div>
                        <h4>Dish : {value.Dish_Name}</h4>
                        <h4>Quantity: {value.Quantity}</h4>
                        
                        

                    </div>
                )
            })}
                        </div>
                        
                            
                        <div>
                        <h4>Total Amount : {billAmount}</h4>
                        <h4>Special Instructions : {specialInstructions}</h4>
                        </div>
                             
                        
                        

                    </Modal.Body>
                    <Modal.Footer>
                    
                    </Modal.Footer>
            </Modal> 
            
        </div>
    )
}

export default Restro_Order
