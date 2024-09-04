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
router.get("/items/:id", rejectUnauthenticated, async (req, res) => {
  const projectId = req.params.id;
  const sqlText = `
  SELECT "id" AS "i", "x", "y", "w", "h", "bg_color", "card_type", "card_settings" FROM "added_cards"
	  WHERE "project_id" = $1; `;
  try {
    const dbRes = await pool.query(sqlText, [projectId]);
    res.send(dbRes.rows);
  } catch (error) {
    console.log("Error in GET/api/projects/items/:id: ", error);
    res.sendStatus(500);
  }
});

router.post("/", rejectUnauthenticated, (req, res) => {
  //Expecting to recieve an object in req.body with schema:
  // {project: {
  //              projectName,
  //              user: {id, username}
  //  }}
  const project = req.body.project;
  const sqlText = `
    INSERT INTO "projects"
        (project_name, user_id)
        VALUES
        ($1, $2)`;
  const sqlValues = [project.projectName, project.user.id];
  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => res.sendStatus(201))
    .catch((dbErr) => {
      console.log("Error in POST/api/projects! ", dbErr);
      res.sendStatus(500);
    });
});

//This is expecting to recieve req.body to contain an object with:
//  projectId
//  layout (an array of objects)
router.put("/items", rejectUnauthenticated, async (req, res) => {
  let connection;
  try {
    connection = await pool.connect();
    await connection.query("BEGIN;");
    const deleteQuery = `
    DELETE FROM "in_progress_edits"
      WHERE "project_id" = $1`;
    await connection.query(deleteQuery, [req.body.projectId]);
    await Promise.all(
      req.body.layout.map((item) => {
        let itemValues = [
          req.body.projectId,
          item.x,
          item.y,
          item.w,
          item.h,
          item.bg_color,
          item.card_type,
          item.card_settings,
        ];
        const itemsQuery = `
      INSERT INTO "in_progress_edits"
        ("project_id", "x", "y", "w", "h", "bg_color", "card_type", "card_settings")
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8);`;
        return connection.query(itemsQuery, itemValues);
      })
    );
    await connection.query("COMMIT;");
    await connection.release();
    res.sendStatus(200);
  } catch (error) {
    console.log("Error in PUT/api/projects! ", error);
    await connection.query("ROLLBACK;");
    await connection.release();
    res.sendStatus(500);
  }
});

module.exports = router;
