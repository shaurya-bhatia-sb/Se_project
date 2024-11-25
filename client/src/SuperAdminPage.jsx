import React, { useState, useEffect } from 'react';
import './SuperAdminPage.css';
import axios from 'axios';

const SuperAdminPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [date, setDate] = useState('');
    const [newsList, setNewsList] = useState([]);
    const [isSuperAdmin, setIsSuperAdmin] = useState(true); // Simulate super admin check

    const allTags = ['News', 'Events', 'Jobs', 'Internship', 'Sports', 'Cultural', 'Research'];

    // Simulate fetching all news from the backend (including news from other admins)
   
    const [news, setNews] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await axios.get("http://localhost:5000/api/news",{
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token here
                    },
                });
                setNews(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        }
        fetchNews();
    }, []);

    // Handle adding news
    const handleAddNews = (e) => {
        e.preventDefault();
        if (!title || !description || !tags.length || !date) {
            alert('Please fill all fields!');
            return;
        }

        const newNews = { title, description, tags, date };
        setNewsList([...newsList, newNews]);

        // Clear form after adding news
        setTitle('');
        setDescription('');
        setTags([]);
        setDate('');
    };

    // Handle tag selection
    const handleTagClick = (tag) => {
        setTags((prevTags) =>
            prevTags.includes(tag)
                ? prevTags.filter((item) => item !== tag)
                : [...prevTags, tag]
        );
    };

    // Handle news removal
    const handleRemoveNews = (title) => {
        setNewsList(newsList.filter((news) => news.title !== title));
    };

    return (
        <div className="superadmin-container">
            <h1 className="superadmin-title">Super Admin - Manage All News</h1>

            {isSuperAdmin && (
                <form onSubmit={handleAddNews} className="superadmin-form">
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Tags:</label>
                        <div className="tags-container">
                            {allTags.map((tag) => (
                                <button
                                    type="button"
                                    key={tag}
                                    className={`tag-btn ${tags.includes(tag) ? 'selected' : ''}`}
                                    onClick={() => handleTagClick(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Add News</button>
                </form>
            )}

            <div className="all-news">
                <h2>All News</h2>
                {news.length === 0 ? (
                    <p>No news available!</p>
                ) : (
                    <div className="news-list">
                        {news.slice().reverse().map((item) => (
                            <div key={item.id} className="news-card">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <span>{item.date}</span>
                                <div>
                                    {item.tags.map((tag, idx) => (
                                        <span key={idx} className="news-tag">{tag}</span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => handleRemoveNews(item.id)}
                                    className="remove-btn"
                                >
                                    Remove News
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuperAdminPage;
