import "./Login.css";
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
    const [email,setEmail] =useState('')
    const [pwd,setPwd] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        try {
            e.preventDefault();

            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    pwd: pwd
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                toast.error(`${JSON.parse(errorText).message}`); // Display error message
                return;
            }

            const responseJson = await response.json();

            console.log('Register Response : ', responseJson);

            toast.success('User Registration successful!');

            setTimeout(() => {
                navigate('/');
            }, 1000);
            
        } catch (error) {
            console.log('Registration Failed : ', error);
            toast.error(`${error.message}`);
        }
    }
  return (
    <div className="form-container">
        <form className='form' onSubmit={handleRegister}>
            <input 
                type="email"
                id='email'
                name='email'
                className='form-label'
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email} 
            />

            <input 
                type="password" 
                name="pwd" 
                id="pwd"
                className='form-label'
                placeholder="Enter your Password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
            />

            <button className='button'>Sign Up</button>

            <div className='row'>
                <h4 className='link-Text'>Already have an Account ?</h4>
                <Link className='link-Value' to="/">Sign In</Link>
            </div>
        </form>
        <ToastContainer />
    </div>
  )
}
