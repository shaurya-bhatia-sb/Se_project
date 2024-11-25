// routes/newsRoutes.js
const express = require('express');
const { createNews, getAllNews, deleteNews } = require('../controllers/newsController');
const { authMiddleware, isSuperAdmin, isAdminOrSuperAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getAllNews);
router.post('/', authMiddleware, isAdminOrSuperAdmin, createNews);
router.delete('/:newsId', authMiddleware, isSuperAdmin, deleteNews);

module.exports = router;
