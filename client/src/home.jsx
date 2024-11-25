import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">Welcome to Thapar News</h1>
                <p className="home-description">
                    Stay updated with the latest news and events at Thapar University. 
                    View news by categories, tags, and more!
                </p>
                <div className="home-buttons">
                    <Link to="/login" className="home-button">Login</Link>
                    <Link to="/register" className="home-button home-register-button">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
