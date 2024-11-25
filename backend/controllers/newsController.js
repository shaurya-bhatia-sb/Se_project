// controllers/newsController.js
const News = require("../models/News");

// Create News
const createNews = async (req, res) => {
	const { title, description, tags } = req.body;
	try {
		const news = await News.create({
			title,
			description,
			tags,
			createdBy: req.user.id,
		});
    const ns=News.findOne({where:{title:title,createdBy:req.user.id}})
		res.status(201).json({ message: "News added successfully" });
	} catch (err) {
		res.status(500).json({ message: `${err}` });
	}
};

// Get All News
const getAllNews = async (req, res) => {
	try {
		const news = await News.findAll();
		res.status(200).json(news);
	} catch (err) {
		res.status(500).json({ message: "Error fetching news" });
	}
};

// Delete News
const deleteNews = async (req, res) => {
	const { newsId } = req.params;
	try {
		const news = await News.findByPk(newsId);
		if (!news) return res.status(404).json({ message: "News not found" });

		if (news.createdBy !== req.user.id && req.user.role !== "superadmin") {
			return res.status(403).json({ message: "Not authorized" });
		}
		await news.destroy();
		res.status(200).json({ message: "News deleted successfully" });
	} catch (err) {
		res.status(500).json({ message: "Error deleting news" });
	}
};

module.exports = { createNews, getAllNews, deleteNews };
