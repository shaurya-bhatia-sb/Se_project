import React, { useState } from 'react';
import './register.css';
import api from './api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rollNumber: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        // Check if email is from @thapar.edu domain
        if (!formData.email.endsWith('@thapar.edu')) {
            setError('Please use a Thapar University email address (@thapar.edu).');
            return;
        }

        if (!formData.rollNumber) {
            setError('Please enter your roll number.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // TODO: Implement API call to register user
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {formData});
            alert('Registration successful');
        } catch (error) {
            alert('Registration failed: ' + error.response?.data?.message || error.message);
        }
        console.log(formData);
        navigate('/login')
        setError('');
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Register for Thapar News</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Roll Number</label>
                        <input 
                            type="text" 
                            name="rollNumber" 
                            value={formData.rollNumber} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="register-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
