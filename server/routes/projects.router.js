const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT * FROM "projects"
        WHERE "user_id" = $1`;
  pool
    .query(sqlText, [req.user.id])
    .then((dbRes) => res.send(dbRes.rows))
    .catch((dbErr) => {
      console.log("Error in GET/api.projects! ", dbErr);
      res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, (req, res) => {
    //Expecting to recieve an object in req.body with schema:
        // {project: {
        //              projectName,
        //              user: {id, username} 
        //  }}
    const project = req.body.project
    const sqlText = `
    INSERT INTO "projects"
        (project_name, user_id)
        VALUES
        ($1, $2)`
    const sqlValues = [project.projectName, project.user.id]
    pool.query(sqlText, sqlValues)
    .then((dbRes) => res.sendStatus(201))
    .catch((dbErr) => {
        console.log('Error in POST/api/projects! ', dbErr)
        res.sendStatus(500)
    })
})

module.exports = router;
