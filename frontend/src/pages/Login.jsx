import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css'; // Importing the CSS file

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null); // Simulating token

  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Simulating login/signup without backend
    const fakeToken = 'fake-jwt-token';
    localStorage.setItem('token', fakeToken);
    setToken(fakeToken);
    alert(state === 'Sign Up' ? 'Account Created' : 'Logged In');
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className='login-container'>
      <div className='login-form'>
        <p className='login-title'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment</p>
        {state === 'Sign Up' && (
          <div className='input-wrapper'>
            <p>Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='input-field'
              type="text"
              required
            />
          </div>
        )}
        <div className='input-wrapper'>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='input-field'
            type="email"
            required
          />
        </div>
        <div className='input-wrapper'>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='input-field'
            type="password"
            required
          />
        </div>
        <button className='submit-button'>{state === 'Sign Up' ? 'Create account' : 'Login'}</button>
        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className='toggle-auth'>
              Login here
            </span>
          </p>
        ) : (
          <p>
            Don’t have an account?{' '}
            <span onClick={() => setState('Sign Up')} className='toggle-auth'>
              Sign up here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
