const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class News extends Model {}

News.init();
