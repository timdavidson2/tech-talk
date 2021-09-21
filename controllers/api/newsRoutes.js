const NewsAPI = require("newsapi");
require("dotenv").config();
const newsapi = new NewsAPI(API_KEY);

newsapi.v2
  .sources({
    category: "technology",
    language: "en",
    country: "us",
  })
  .then((response) => {
    console.log(response);
    /*
    {
      status: "ok",
      sources: [...]
    }
  */
  });
