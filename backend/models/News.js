// models/News.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const News = sequelize.define('News', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

News.belongsTo(User, { foreignKey: 'createdBy' });

module.exports = News;
