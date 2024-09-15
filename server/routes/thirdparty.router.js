const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");
const upload = require('../modules/aws.config.js')

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
      res.send(TMDBRes.data.results);
    })
    .catch((err) => {
      console.log("Error querying TMDB: ", err);
      res.sendStatus(500);
    });
});
router.put('/upload', rejectUnauthenticated, upload.single('file'), (req, res) => {
  const itemId = req.body.id;
  const itemSettings = {...req.body.settings, img_url: req.file.location};
  const backgroundColor = req.body.backgroundColor;
  const itemHeader = req.body.cardHeader;
  const itemHeight = req.body.h;
  const itemWidth = req.body.w;
  const sqlText = `
  UPDATE "added_cards"
    SET "card_settings" = $2,
    "bg_color" = $3, 
    "card_header" = $4,
    "h" = $5,
    "w" = $6
    WHERE "id" = $1;
    `;
  pool
    .query(sqlText, [
      itemId,
      itemSettings,
      backgroundColor,
      itemHeader,
      itemHeight,
      itemWidth,
    ])
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log("Error updating item!", dbErr);
      res.sendStatus(500);
    });
})

module.exports = router;
