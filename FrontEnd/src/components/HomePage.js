import React from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div >
      <h3 style={{color:'orange'}}>You are a...</h3>
      <ul>
        <li><Link to="/customer"><button>Customer</button></Link></li> <br></br>
        <li><Link to="/restaurant"><button>Restaurant</button></Link></li>
      </ul>
            
        </div>
    )
}

export default HomePage
