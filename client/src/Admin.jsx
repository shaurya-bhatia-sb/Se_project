import React, { useState } from "react";
import "./Admin.css";
import axios from "axios";

const Admin = () => {
	// State to store news details
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [tags, setTags] = useState([]);
	const [date, setDate] = useState("");
	const [newsList, setNewsList] = useState([]);

	const allTags = [
		"News",
		"Events",
		"Jobs",
		"Internship",
		"Sports",
		"Cultural",
		"Research",
	];

	// Handle adding news
	const handleAddNews = async (e) => {
		e.preventDefault();
		if (!title || !description || !tags.length || !date) {
			alert("Please fill all fields!");
			return;
		}

		const newNews = { title, description, tags, date };
		const token = localStorage.getItem("token");
		setNewsList([...newsList, newNews]);
		try {
			await axios.post(
				"http://localhost:5000/api/news",
				{ title, description, tags,date },
				{
					headers: {
						Authorization: `Bearer ${token}`, // Include token in the Authorization header
					},
				}
			);
			alert("News added successfully");
		} catch (error) {
			alert(
				"Failed to add news: " + error.response?.data?.message || error.message
			);
			console.log(`${title}\n${description}\n${tags}`);
		}

		
		setTitle("");
		setDescription("");
		setTags([]);
		setDate("");
	};

	
	const handleTagClick = (tag) => {
		setTags((prevTags) =>
			prevTags.includes(tag)
				? prevTags.filter((item) => item !== tag)
				: [...prevTags, tag]
		);
	};

	// Handle news removal
	// const handleRemoveNews = (title) => {
	// 	setNewsList(newsList.filter((news) => news.title !== title));
	// };

	return (
		<div className="admin-container">
			<h1 className="admin-title">Manage News</h1>
			<form onSubmit={handleAddNews} className="admin-form">
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
								className={`tag-btn ${tags.includes(tag) ? "selected" : ""}`}
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
				<button type="submit" className="submit-btn">
					Add News
				</button>
			</form>

			<div className="added-news">
				<h2>News List</h2>
				{newsList.length === 0 ? (
					<p>No news added yet!</p>
				) : (
					<div className="news-list">
						{newsList.map((news, index) => (
							<div key={index} className="news-card">
								<h3>{news.title}</h3>
								<p>{news.description}</p>
								<span>{news.date}</span>
								<div>
									{news.tags.map((tag, idx) => (
										<span key={idx} className="news-tag">
											{tag}
										</span>
									))}
								</div>
								{/* <button
									onClick={() => handleRemoveNews(news.title)}
									className="remove-btn"
								>
									Remove News
								</button> */}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Admin;
