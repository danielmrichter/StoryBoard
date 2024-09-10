const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();
const setItemType = require("../api services/setItemType");

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
        ($1, $2);`;
  const sqlValues = [project.projectName, project.user.id];
  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => res.sendStatus(201))
    .catch((dbErr) => {
      console.log("Error in POST/api/projects! ", dbErr);
      res.sendStatus(500);
    });
});
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `
  DELETE FROM "projects"
    WHERE "id" = $1`;
  pool
    .query(sqlText, [req.params.id])
    .then((dbRes) => res.sendStatus(200))
    .catch((dbErr) => {
      console.log("Error in DELETE/api/projects/:id: ", dbErr);
      res.sendStatus(500);
    });
});
router.patch("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `UPDATE "projects"
    SET "project_name" = $1
    WHERE "id" =$2`;
  pool
    .query(sqlText, [req.body.name, req.params.id])
    .then((dbRes) => res.sendStatus(200))
    .catch((dbErr) => {
      console.log("ERROR in patch/api/projects: ", dbErr);
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
    await Promise.all(
      req.body.layout.map((item) => {
        let itemValues = [item.x, item.y, item.w, item.h, item.i];
        const itemsQuery = `
      UPDATE "added_cards"
        SET "x" = $1, "y" = $2, "w" = $3, "h" = $4
        WHERE "id" = $5`;
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
router.post("/items", rejectUnauthenticated, (req, res) => {
  const projectId = req.body.projectId;
  const newItemType = req.body.cardType;
  const sqlText = setItemType(newItemType);
  pool
    .query(sqlText, [projectId, newItemType])
    .then((dbRes) => res.sendStatus(200))
    .catch((dbErr) => {
      console.log("Error in POST/api/projects/items: ", dbErr);
      res.sendStatus(500);
    });
});
router.patch("/items/:id", rejectUnauthenticated, (req, res) => {
  const itemId = req.params.id;
  const itemSettings = req.body.settings;
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
});
router.get("/items/:id", rejectUnauthenticated, async (req, res) => {
  const projectId = req.params.id;
  const sqlText = `
  SELECT "id" AS "i", "x", "y", "w", "h", "bg_color", "card_type", "card_settings", "card_header" FROM "added_cards"
	  WHERE "project_id" = $1; `;
  try {
    const dbRes = await pool.query(sqlText, [projectId]);
    res.send(dbRes.rows);
  } catch (error) {
    console.log("Error in GET/api/projects/items/:id: ", error);
    res.sendStatus(500);
  }
});
module.exports = router;
