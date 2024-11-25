import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
    const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		// Add login logic here
		if (!email || !password) {
			setError("Please fill in all fields");
		} else {
			setError("");
			try {
				const response = await axios.post(
					"http://localhost:5000/api/users/login",
					{ email, password }
				);
                const { role, token } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);

                // Redirect based on role
                if (role === 'admin') {
                    navigate('/admin');
                } else if (role === 'superadmin') {
                    navigate('/superadmin');
                } else {
                    navigate('/user');
                }
				
			} catch (error) {
				alert(
					"Login failed: " + error.response?.data?.message || error.message
				);
			}
		}
	};

	return (
		<div className="login-container">
			<div className="login-card">
				<h2 className="login-title">Login</h2>
				<form className="login-form" onSubmit={handleLogin}>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
						/>
					</div>
					{error && <div className="error">{error}</div>}
					<button type="submit" className="login-button">
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
