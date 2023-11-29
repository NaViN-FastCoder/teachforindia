import React, { useEffect, useState } from "react";
import { Link ,redirect} from "react-router-dom";
import './login.css';
import teachforindia_logo from '../src/teachforindia_logo.svg';
import logo from '../src/logo.png';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
function Login(){
    let citynames;
    
    const navigate=useNavigate();
     const [apiData,setApiData]=useState([]);
    const[data,setData]=useState({
        email:'',
        password:''
})
    
    useEffect(()=>{
        const fetchData = async () => {
        try{
            citynames=await axios.get('http://localhost:8000/specificpath/displayAll');
           
           
            setApiData(citynames.data);
          
         }
         catch(error){console.log('error',error)}
    }
    fetchData();
},
[])
    const handleformsubmit=async(e)=>{
        e.preventDefault();
        console.log(data.email);
        console.log(data.password);

        if(data.email==='admin@teachforindia.com' && data.password==='admin'){
            
            navigate('/disp',{ state: { apiData } }) ;
            console.log(apiData);
           }
    
          
    }
    ;
    
    const handleformchange=(e)=>{
        const {name,value}=e.target;
        setData((prevData)=>({...prevData,[name]:value}))
    }
    return(
        <div >
            <div className="header">
                <img src={teachforindia_logo} className="logo"></img>
            <Link to={'/register'}>
            <button className="regbtn">register</button></Link></div>
            <div className="start">
            <img src={logo} />
            <div className="mainform">
            <div className="loginbtn">

            <label className="login">Login</label>
            <div className="first">
            <div className="email">
                <label className="userlabel" >Username</label>
                <input type="email" name="email" value={data.email} onChange={handleformchange}/>
            </div>
            <div className="password">
                <label className="userlabel">Password</label>
                <input type="password" name="password" value={data.password} onChange={handleformchange}/>
            </div>

            <div className="email">
                <button className="button3" onClick={handleformsubmit}>Lets Go</button>
            </div>

            </div>
           
            </div>
            </div>
            </div>
        </div>
    );
}
export default Login