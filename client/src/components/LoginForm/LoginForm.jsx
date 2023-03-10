import React, { useState } from 'react';
import './login.css'
import MyBrandLogo from '../../assets/Logo.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function SignUpLoginForm() {
  
    const [formType, setFormType] = useState('signup'); // track whether we're displaying the signup or login form
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState(''); // will display an error message if the sign up or login fails
    
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

     const validateForm = () => {
        // check that the email and password fields are not empty
        if (!formData.email) {
            setErrorMessage('Please enter your email');
            return false;
        }else if(!formData.password){
            setErrorMessage('Please enter your password');
        }
        return true;
    } 

    
    const handleSubmit = async (event) => {
        event.preventDefault();

        
        try {
           if (validateForm()) {
                if (validateForm()) {
                const { email, password } = formData;
                const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',       
                headers: {
                            'Content-Type': 'application/json',
                        },
                body: JSON.stringify({
                            email,
                            password,
                        }),
                    })
                    const data = await response.json() 
                    console.log(data, "Data");
                }
            } 
        } catch (error) {
            console.log(error);
        }

        
    }

    return (
        <>
        <div className='logo-block'>
           <img className='logo' src={MyBrandLogo} />
        </div>
        <form onSubmit={handleSubmit}>
            {formType === 'signup' ? (
                <h2>Sign Up</h2>
            ) : (
                <h2>Log In</h2>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email"
            />
            
            
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="password"
            />
            <button className='btn_submit' type="submit">
                {formType === 'signup' ? 'Sign Up' : 'Log In'}
            </button>
            <p>
                {formType === 'signup' ? (
                    <>Already have an account? <a href="#" onClick={() => setFormType('login')}>Log in</a></>
                ) : (
                    <>Don't have an account? <a href="#" onClick={() => setFormType('signup')}>Sign up</a></>
                )}
            </p>
        </form>
        </>
    );
}

export default SignUpLoginForm;
