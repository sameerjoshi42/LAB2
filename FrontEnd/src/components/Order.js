import React from 'react'
import Navbar from './Navbar'
import {useEffect, useState } from "react";
import Axios from 'axios'
import Table from 'react-bootstrap/Table'
import ReactPaginate from "react-paginate";
import {Modal, ModalBody} from 'react-bootstrap';

import Button from 'react-bootstrap/esm/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
const Order = () => {

    var orderData=[];
    const cust_name=sessionStorage.getItem('cust_name')
    const[orderInfo,setOrderInfo]=useState([]);
    const [orderDetails,setOrderDetails]=useState([]);
    const[orderid,setOrderId] = useState(0);
    const[radio,setRadio]=useState("");
    const[cancelError,setCancelError]=useState("");
    const[pageNumber,setPageNumber]=useState(0);
    const[ordersPerPage,setOrdersPerPage]=useState(5);
    const[offset,setOffset] = useState(0);
    const[tableData,setTableData]=useState([]);
    const[pageCount,setPageCount]=useState(0);
    const[openModal,setOpenModal]=useState(false);
    const[openErrorModal,setOpenErrorModal]=useState(false);
    const[billAmount,setBillAmount]=useState(0);
    const[specialInstructions,setSpecialInstructions]=useState("");
  
    useEffect(()=>{
        const url ="http://localhost:3002/getOrderDetailsMongo";
        Axios.post(url,{cust_name:cust_name
        },).then((response)=>{
            const orderData=response.data;
            const orderSlice = orderData.slice(offset,offset+ordersPerPage);
            setPageCount(Math.ceil(orderData.length/ordersPerPage));
            setTableData(orderSlice);
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

        const cancelOrder=(id,status)=>{
            const url ="http://localhost:3002/cancelOrder";
            if(status=="Order Placed"){
                Axios.post(url,{order_Id:id,
                    status:"Cancelled"
                },).then((response)=>{
                    console.log('order cancelled');
                    window.location.reload();
                    
                    
                })

            }
            else if(status=="In the Kitchen"){
                setCancelError("Restaurant has already started preparing your order! Cannot cancel the order!!")
                setOpenErrorModal(true);
                
            }
            else if(status=="On the way"){
                setCancelError("Your order is on the way! Cannot cancel the order!!")
                setOpenErrorModal(true);
            }
            else if(status=="Delivered"){
                setCancelError("We have already delivered your order! Cannot cancel the order!!")
                setOpenErrorModal(true);
            }

        }

       
      

       const handlePageClick =(e)=>{
        const selectedPage = e.selected;
        console.log("selected page is",selectedPage);
        const offset = selectedPage * ordersPerPage;
        console.log("offset is",offset);
        setOffset(offset);
        setPageNumber(selectedPage);
        const data = orderInfo;
        const orderSlice = data.slice(offset,offset+ordersPerPage);
            
            setTableData(orderSlice);
       }
    
    return (
        <div>
            <Navbar/>
            <h3> Orders Summary..........</h3> <br></br>

            <div className="radio__filter">
                <label htmlFor="neworder">Order Placed </label>
                <input id="neworder" type="radio" value="order placed" checked={radio==="order placed"} onChange={(e)=>setRadio(e.target.value)}/>
                <label htmlFor="kitchen">In the Kitchen</label>
                <input id="kitchen" type="radio" value="kitchen" checked={radio==="kitchen"} onChange={(e)=>setRadio(e.target.value)}/>
                <label htmlFor="transit">On the way</label>
                <input id="transit" type="radio" value="transit" checked={radio==="transit"} onChange={(e)=>setRadio(e.target.value)}/>
                <label htmlFor="delivered">Delivered</label>
                <input id="delivered" type="radio" value="delivered" checked={radio==="delivered"} onChange={(e)=>setRadio(e.target.value)}/>
                <label htmlFor="cancel">Cancelled</label>
                <input id="cancel" type="radio" value="cancelled" checked={radio==="cancelled"} onChange={(e)=>setRadio(e.target.value)}/>
                <button onClick={()=>setRadio("")}>Reset</button>

            </div> <br></br>

            <div>
                <label for="page"><strong>Choose orders per page:</strong></label>
                <select id="page" name="page" onChange={(e)=>{
                    setOrdersPerPage(parseInt(e.target.value))
                    // setPageCount(Math.ceil(orderInfo.length/ordersPerPage));
                    // //setOffset(0);
                    // const orderSlice = orderInfo.slice(offset,offset+ordersPerPage);
                    
                    //setTableData(orderSlice);
                    
                }
                    
                    } value={ordersPerPage}>
                   <option value="" selected >Select</option>
                   <option value="2">2</option>
                   <option value="5" >5</option>
                    
                    <option value="10"> 10</option>
                    
                    </select>

                </div>
                <br></br>
                <div>
                    <Button onClick={
                        (e)=>{
                            //setOrdersPerPage(e.target.value)
                            setPageCount(Math.ceil(orderInfo.length/ordersPerPage));
                            setOffset(0);
                            const orderSlice = orderInfo.slice(offset,offset+ordersPerPage);
                            setPageNumber(e.selected);
                            setTableData(orderSlice);
                            
                        }
                    }>Submit</Button>
                </div>
            
            

            <div className="table">
            <Table >
                <thead>
                    <tr>
                        
                        <th>Restaurant Name</th>
                        <th>Order Status</th>
                        <th>Order Date</th>
                        <th>Order Time</th>
                        <th>Special Instructions</th>
                        <th>Order Details</th>
                        <th>Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                {tableData.filter((data)=>{
                       if(radio===""){
                        return data;
                    }
                    else if(radio==="order placed"){
                        if(data.Order_Status==="Order Placed"){
                            return data;
                        }

                    }
                    else if(radio==="delivered"){
                        if(data.Order_Status==="Delivered"){
                            return data;
                        }

                    }
                    else if(radio==="kitchen"){
                        if(data.Order_Status==="In the Kitchen"){
                            return data;
                        }

                    }
                    else if(radio==="transit"){
                        if(data.Order_Status==="On the way"){
                            return data;
                        }

                    }
                    else if(radio==="cancelled"){
                        if(data.Order_Status==="Cancelled"){
                            return data;
                        }

                    }
                }).
                map((val)=>{
                return(
                    <tr>
                        <td>{val.Restro_Name}</td>
                        <td>{val.Order_Status}</td>
                        <td>{val.Order_Dt}</td>
                        <td>{val.Order_Time}</td>
                        <td>{val.Instructions}</td>
                        <td><button onClick={()=>viewDetails(val._id,val.Order_Amount,val.Order_Instructions)}>View Details</button></td>
                        <td><button onClick={()=>cancelOrder(val._id,val.Order_Status)}>Cancel Order</button></td>

                    </tr>
                )
            })}
                </tbody>
            </Table>
            <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    //  marginPagesDisplayed={2}
                    //  pageRangeDisplayed={5}
                    onPageChange={(e)=>handlePageClick(e)}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
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
                            if(value.Order_Id==orderid){
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
          
            <Modal show={openErrorModal} onHide={()=>{setOpenErrorModal(false)}}>
                <ModalBody>
                    <div style={{width: "105%",float: "center",color:'red'}}>
                    <h3>{cancelError}</h3>
                    </div>
                </ModalBody>
            </Modal>
            {/* <div style={{width: "105%",float: "center",color:'red'}}>
                <h3>{cancelError}</h3>
            </div> */}
            
        </div>
    )
}

export default Order


