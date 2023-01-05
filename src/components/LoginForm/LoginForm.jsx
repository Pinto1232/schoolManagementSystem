import React, { useState, useHistory  } from 'react';
import './login.css'


function SignUpLoginForm() {
  
    const [formType, setFormType] = useState('signup'); // track whether we're displaying the signup or login form
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState(''); // will display an error message if the sign up or login fails
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const validateForm = () => {
        // check that the email and password fields are not empty
        if (!formData.email || !formData.password) {
            setErrorMessage('Please enter your email and password');
            return false;
        }
        return true;
    }

    

    /* const history = useHistory();  */
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            if (validateForm()) {
                const { email, password } = formData;
                const body = { email, password };
                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                };
                fetch('/api/login', options)
                    .then(res => res.json())
                    .then(data => {
                        // handle the response from the server
                        if (res.status === 200) {
                            // the request was successful, so display a success message
                            history.push('/dashboard');
                        } else {
                            // the request was not successful, so display an error message
                            setMessage(`Error: ${data.message}`);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {formType === 'signup' ? (
                <h2>Sign Up</h2>
            ) : (
                <h2>Log In</h2>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
            />
            <label htmlFor="password">Password</label>
            <inputnp
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
            />
            <button type="submit">
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
    );
}

export default SignUpLoginForm;
