const router = require("express").Router();
const { url } = require("inspector");
const { Model } = require("sequelize/types");
const { News } = require("../../models");
require("dotenv").config();
const apikey = process.env.API_KEY;


router.get('/', async(req, res)=> {
  try{
   const URL = `https://newsapi.org/v2/top-headlines/sources?category=technology&country=us&apiKey=ec2db157b85f4ea890c9724032b7dea5`;
   await News.findAll();
  }
})