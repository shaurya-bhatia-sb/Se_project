import React, { useState,useEffect } from 'react';
import './MainPage.css';
import axios from 'axios';

const MainPage = () => {
    const [selectedTags, setSelectedTags] = useState([]);

    const tags = ['News', 'Events', 'Jobs', 'Internship', 'Sports', 'Cultural', 'Research'];

    // Sample news data with tags
    const [newsData, setNews] = useState([]);
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

    const toggleTag = (tag) => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.includes(tag)
                ? prevSelectedTags.filter((item) => item !== tag)
                : [...prevSelectedTags, tag]
        );
    };

    // Filter news based on selected tags (all tags must match)
    const filteredNews = selectedTags.length
        ? newsData.filter((news) =>
              selectedTags.every((tag) => news.tags.includes(tag))
          )
        : newsData;

    return (
        <div className="main-container">
            <h1 className="main-title">Thapar University News</h1>
            <div className="tags-filter">
                <h2>Filter by Tags</h2>
                <div className="tags-list">
                    {tags.map((tag) => (
                        <button
                            key={tag}
                            className={`tag-btn ${selectedTags.includes(tag) ? 'selected' : ''}`}
                            onClick={() => toggleTag(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
            <div className="news-list">
                {filteredNews.slice().reverse().map((news) => (
                    <div className="news-card" key={news.title}>
                        <h3 className="news-title">{news.title}</h3>
                        <p className="news-description">{news.description}</p>
                        <div className="news-footer">
                            <span className="news-date">{news.date}</span>
                            <div className="news-tags">
                                {news.tags.map((tag) => (
                                    <span className="news-tag" key={tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;
