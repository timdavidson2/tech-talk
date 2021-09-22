const router = require("express").Router();
const { News } = require("../../models");

require("dotenv").config();
const API_KEY = process.env.API_KEY;

const URL = `https://newsapi.org/v2/top-headlines/sources?category=technology&apiKey=${API_KEY}`;
