import React, { useEffect, useState } from "react";
import './Register.css';

function Register(){
    const [checkedLanguageValue,setCheckedLanguageValue]=useState([]);
    const[weekcheckedWeekValue,setweekcheckedWeekValue]=useState([]);
    
    const[formData,setFormData]=useState({
                name:'',
                contact:0,
                email:'',
                location:'',
               
    })
    
    const handleChange = (e) => {
        
        const { name, value} = e.target;

        setFormData((prevValues)=>({...prevValues,[name]:value}));}
    
    const handleformsubmit=async(e)=>{
        e.preventDefault();

        console.log('Form Data:', formData);
        console.log('Checked Language Value:', checkedLanguageValue);
        console.log('Week Checked Week Value:', weekcheckedWeekValue);
        
        try{
            const response=await fetch('http://localhost:8000/specificpath/savevolunteerdata',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                // body:JSON.stringify({formData,checkedLanguageValue,weekcheckedWeekValue}),
                body: JSON.stringify({
                    formData: {
                      name: formData.name,
                      contact: formData.contact,
                      email: formData.email,
                      location: formData.location,
                    },
                    checkedLanguageValue,
                    weekcheckedWeekValue,
                  }),
            });

            if(response.ok){
                console.log('Data saved successfully');
                alert('Data saved.We got your preferences. We will be in touch with you in shortly');
            }
            else{
                console.log('Failed to save data')
            }
           
        }
        catch(error){
            console.log(error);
        }

    }
    
    const handlecheckboxchange=(e)=>{
        const {value,checked}=e.target;
        
        setCheckedLanguageValue((prevValues)=>{
            if(checked && !prevValues.includes(value)){
               return [...prevValues,value];
        }
        else{
       return prevValues.filter((item)=>item!==value);
        }
       
        })
        console.log(checkedLanguageValue);
        
    }
    const handlecheckboxWeekchange=(e)=>{
        const {value,checked}=e.target;
        setweekcheckedWeekValue((prevValues)=>{
            if(checked && !prevValues.includes(value)){
               return[...prevValues,value];
            }
            else{
                return prevValues.filter((item)=>item!==value);
            }
            
        })
        console.log(weekcheckedWeekValue);
    }

  


    return(
        <form onSubmit={handleformsubmit}>
            
            <div className="container">
            <label className="text">Register Volunteer</label>
            <div className="form-start">
                <div className="input-data">

                <div className="labeldiv">
            <label className="labelclass">Name</label>
            <input type="text" placeholder="Name" name="name" id="name" value={formData.name}
            onChange={handleChange}/>
            </div>

                    <div className="labeldiv">
            <label className="labelclass">Contact Number</label>
            <input type="number" placeholder="Contact number" name="contact" id="contact" value={formData.contact}
            onChange={handleChange}/>
            </div>
            <div className="labeldiv">

            <label className="labelclass">Email ID</label>
            <input type="email" name="email" placeholder="Email id" id="email" value={formData.email}
            onChange={handleChange}/>
            </div>

            <div className="labeldiv">

<label className="labelclass">Location</label>
<input type="text" placeholder="Location" name="location" id="location" value={formData.location}
            onChange={handleChange}/>
</div>

            
            <div className="labeldiv">
            <label className="labelclass">Languages Spoken</label>
            <label>
            <input type="checkbox" value="English" checked={checkedLanguageValue.includes("English")} onChange={handlecheckboxchange}/>English</label>
             <label>
            <input type="checkbox" value="Hindi" checked={checkedLanguageValue.includes("Hindi")} onChange={handlecheckboxchange}/>Hindi</label>
             {/* <label>
            <input type="checkbox" value="Marathi  " checked={checkedLanguageValue.includes("Marathi")} onChange={handlecheckboxchange}/>Marathi</label> */}
             <label>
            <input type="checkbox" value="Gujrati" checked={checkedLanguageValue.includes("Gujrati")} onChange={handlecheckboxchange}/>Gujrati</label>
            </div>
            <div className="labeldiv">
            <label className="labelclass">Availability</label>
            <div className="checkboxes">  
            {/* <label>
            <input type="checkbox" value="Sunday" checked={weekcheckedWeekValue.includes("Sunday")} onChange={handlecheckboxWeekchange}/>Sunday</label> */}
             <label>
            <input type="checkbox" value="Monday" checked={weekcheckedWeekValue.includes("Monday")} onChange={handlecheckboxWeekchange}/>Monday</label>
             <label>
            <input type="checkbox" value="Tuesday" checked={weekcheckedWeekValue.includes("Tuesday")} onChange={handlecheckboxWeekchange}/>Tuesday</label>
             <label>
                
            <input type="checkbox" value="Wednesday" checked={weekcheckedWeekValue.includes("Wednesday")} onChange={handlecheckboxWeekchange}/>Wednesday</label>
            <label>
            <input type="checkbox" value="Thursday" checked={weekcheckedWeekValue.includes("Thursday")} onChange={handlecheckboxWeekchange}/>Thursday</label>
             <label>
            <input type="checkbox" value="Friday" checked={weekcheckedWeekValue.includes("Friday")} onChange={handlecheckboxWeekchange}/>Friday</label>
            <label>
            <input type="checkbox" value="Saturday" checked={weekcheckedWeekValue.includes("Saturday")} onChange={handlecheckboxWeekchange}/>Saturday</label>
            </div>
            </div>
 
            <button className="button2" type="submit">Submit</button>
            </div>
            </div>
            </div>
                    </form>
    )
}export default Register;