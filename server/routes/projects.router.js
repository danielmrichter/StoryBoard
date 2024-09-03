const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:id", rejectUnauthenticated, (req, res) => {
  const userId = req.params.id;
  console.log('Request recieved! ', userId)
  const sqlText = `
    SELECT * FROM "projects"
        WHERE "user_id" = $1`;
  pool
    .query(sqlText, [userId])
    .then((dbRes) => res.send(dbRes.rows))
    .catch((dbErr) => {
      console.log("Error in GET/api.projects! ", dbErr);
      res.sendStatus(500);
    });
});

module.exports = router;
