const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");

router.get("/tmdb", rejectUnauthenticated, (req, res) => {
  // NOTE: There needs to be a valid TMDB api key in your environment.
  // dotEnv is added to the project, so simply create a .env file and supply
  // a TMDB_API_KEY, and get an api key from https://www.themoviedb.org/settings/api
  const apiKey = process.env.TMDB_API_KEY;
  const searchRequest = req.query.q;
  axios
    .get(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchRequest}`
    )
    .then((TMDBRes) => {
        // console.log('Got something back from TMDB: ', TMDBRes.data)
        res.send(TMDBRes.data.results)})
    .catch((err) => {
      console.log("Error querying TMDB: ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
