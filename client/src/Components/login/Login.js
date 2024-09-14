import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      try {
        e.preventDefault();

        const response = await fetch('/login', {
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

        console.log('Login Response : ', responseJson);

        toast.success('Login successful!');

        setTimeout(() => {
          navigate('home')
        }, 1000);
        
      } catch (error) {
        console.log('Login Failed : ', error);
        toast.error(`${error.message}`);
      }
    }
      
    return (
        <div className="form-container">
          <form className='form' onSubmit={handleLogin}>
              <input 
                type="email"
                id='email'
                name='email'
                className='form-label'
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input 
                type="password" 
                name="pwd" 
                id="pwd"
                className='form-label'
                placeholder="Enter your Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />

            <button className='button'>Sign In</button>

            <div className='row'>
              <h4 className='link-Text'>Don't have an Account ?</h4>
              <Link className='link-Value' to="/signup">Sign Up</Link>
            </div>

          </form>
          <ToastContainer />
        </div>
    )
}
