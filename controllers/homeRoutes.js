const router = require("express").Router();
const { User, Blog, Comment, News } = require("../models");
const withAuth = require("../utils/auth");
require("dotenv").config();
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.API_KEY);

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blogs = blogData.map((blog) =>
      blog.get({
        plain: true,
      })
    );

    let articles;

    newsapi.v2
      .topHeadlines({
        // sources: "bbc-news,the-verge",
        // q: "bitcoin",
        category: "technology",
        language: "en",
        country: "us",
        page: 6,
      })
      .then((response) => {
        articles = response.articles;
        console.log(articles);
        res.render("homepage", {
          blogs,
          logged_in: req.session.logged_in,
          articles,
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const blog = blogData.get({
      plain: true,
    });

    res.render("blog", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Blog,
        },
      ],
    });

    const user = userData.get({
      plain: true,
    });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

router.get("/signUp", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signUp");
});

module.exports = router;
