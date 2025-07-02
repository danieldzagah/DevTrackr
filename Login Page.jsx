import React, { useState } from 'react';
import './Login Page.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Login submitted!');
    setFormData({ email: '', password: '' });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="app-container">
      <main className="main">
       
        <form className="project-form" onSubmit={handleSubmit}>
          <div className="form-group"> 
            <h1 className="login">Log In</h1>
            <label htmlFor="email">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className="projectname"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="projectname"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}></i>
              </button>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit">Log In</button>

          <p className="forgot-link">
            <a href="#">Forgot Password?</a>
          </p>
          <p className="signup-link">
            Don’t have an account? <a href="#">Sign UP</a>
          </p>
        </form>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </main>
    </div>
  );
};

export default Login;