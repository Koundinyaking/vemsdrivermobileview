import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email: loginId,
                password: password
            });

            if (response.status === 200) {
                const driverId = response.data.driverId; 
                console.log("Driver ID:", driverId); 
                localStorage.setItem('driverId', driverId);
                toast.success('Login successful!', {
                    position: "top-center",
                    autoClose: 2000,
                });
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Login failed: Invalid email or password', {
                    position: "top-center",
                    autoClose: 3000,
                });
            } else {
                toast.error('An error occurred. Please try again.', {
                    position: "top-center",
                    autoClose: 3000,
                });
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>SignIn</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="loginId">Email ID</label>
                        <input
                            type="text"
                            id="loginId"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
