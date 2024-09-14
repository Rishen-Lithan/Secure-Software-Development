import "./Login.css";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


export default function Signup() {
    const [name, setName] = useState('')
    const [email,setEmail] =useState('')
    const [password,setPassword] = useState('')
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const goThere = useNavigate();

    async function signup(e){
        e.preventDefault();

        const user={ name, email, password }

        try {
            const result=(await axios.post("/api/users/register",user)).data;

            setMessage(true);
            setName("");
            setEmail("");
            setPassword("");

            window.location.reload();
        } catch (error) {
            console.log(error);
            setError(true)
        } 
    }


  return (
    <div className="form-container">
        <div className='form'>
            <input 
                type="email"
                id='email'
                name='email'
                className='form-label'
                placeholder="Enter your Email"  
            />

            <input 
                type="password" 
                name="pwd" 
                id="pwd"
                className='form-label'
                placeholder="Enter your Password"
            />

            <button className='button'>Sign Up</button>

            <div className='row'>
                <h4 className='link-Text'>Already have an Account ?</h4>
                <Link className='link-Value' to="/">Sign In</Link>
            </div>
        </div>
    </div>
  )
}
