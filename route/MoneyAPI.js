const { rejects } = require("assert");
const express = require("express");
var router = express.Router();
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const {isEmpty,CheckInsertData}=require("../validation/validation");
// Connection to the SQlite database
const db_name = path.join(__dirname, "data", "apptest.db");

//Setup Database
router.get("/setup", (req, res) => {

  const db = new sqlite3.Database(db_name, err => {
    if (err) {
      return res.send(err);
    }
    console.log("Successful connection to the database 'apptest.db'");
  });

  const sql_create = `
    CREATE TABLE IF NOT EXISTS libralionmoney (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user text NOT NULL,
    amount real NOT NULL,
    category TEXT,
    description text,
    date real
    );
    CREATE TABLE IF NOT EXISTS datetime_real(
    d1 real
    );

    `;
  db.run(sql_create, err => {
    if (err) {
      return res.send(err);
    }
    else {
      db.close();
      res.send({
        "statusCode": "200",
        "message": `Successful creation of the 'libralionmoney' table`
      });
    }
  });
});

// GET money data
router.get("/getdata/:id", (req, res) => {
  let db = new sqlite3.Database(db_name, err => {
    if (err) {
      return res.send(err);
    }
  });

  let id=req.params.id;
  let filter=id?`where id=${id}`:``;
  let sql ;
  if(id!='*')
  {
    sql = `SELECT * from libralionmoney ${filter}`;
  }
  else
  sql = `SELECT * from libralionmoney`;


  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.send(err);
    }
    if(rows.length!=0)
    {
      res.status(200).send(rows);
       return;
    }
    else
    {
      return res.send({
        "statusCode": "404",
        "message": `Data not found.`
      });
    }
    
  });

  // close the database connection
  db.close();
});

// insert data
router.post("/insertrecord", async (req, res) => {

  const{user,amount,category,description,date}=req.body;

  CheckInsertData(req.body)
  .then(response=>{
  }).catch(err=>{
    res.status(err.statusCode).send(err);
  })

  if(isEmpty(user))
  {
    return res.status(400).send({
      "statusCode":"400",
      "message":"user parameter is required."
    });
  }
  if(isEmpty(amount))
  {
    return res.status(400).send({
      "statusCode":"400",
      "message":"amount is required."
    });
  }
  if(isEmpty(category))
  {
    return res.status(400).send({
      "statusCode":"400",
      "message":"category parameter is required."
    });
  }
  if(isEmpty(description))
  {
    return res.status(400).send({
      "statusCode":"400",
      "message":"description is required."
    });
  }
  if(isEmpty(date))
  {
    return res.status(400).send({
      "statusCode":"400",
      "message":"date is required."
    });
  }
  const db = new sqlite3.Database(db_name, err => {
    if (err) {
      return res.send(err);
    }
  });

  const sql = `INSERT INTO libralionmoney(user,amount,category,description,date) VALUES 
  (?,?,?,?,?)`;
   db.run(sql, [user,amount,category,description,date], function(err) {
    if (err) {
      res.status(500).send({
        "statusCode":500,
        "error":err.name,
        "stack":err.stack,
        "message":err.message
      });
      return;
    }
    else
    {
      res.send({
        "statusCode":200,
        "message":`Rows inserted ${this.changes}`
      });
      return;
    }
  });
  db.close();
});


// POST /edit/5
router.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const book = [req.body.Title, req.body.Author, req.body.Comments, id];
  const sql = "UPDATE Books SET Title = ?, Author = ?, Comments = ? WHERE (Book_ID = ?)";
  db.run(sql, book, err => {
    if (err) {
      return console.error(err.message);
    }
    else {
      res.send("true");
    }
  });
});

// GET /delete/5
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from libralionmoney WHERE id = ?";

  const db = new sqlite3.Database(db_name, err => {
    if (err) {
      return res.send(err);
    }
  });

  db.run(sql, id, (err, row) => {
    if (err) {
      res.status(500).send({
        "statusCode":500,
        "error":err.name,
        "stack":err.stack,
        "message":err.message
      });
      return;
    }
    else
    {
      res.send({
        "statusCode":200,
        "message":`Rows deleted.`
      });
      return;
    }
  });
});

module.exports = { router };