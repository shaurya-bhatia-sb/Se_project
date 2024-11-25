// server.js
const express = require('express');
const sequelize = require('./config/db');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
const cors = require('cors')

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
}).catch(err => {
  console.error("Database connection failed:", err);
});
