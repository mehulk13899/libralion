const express = require("express");

const bodyParser = require('body-parser');
const {router}=require('./route/MoneyAPI');

// Creating the Express server
const app = express();
const port=process.env.PORT||3000;
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/libralion', router);

// Starting the server
app.listen(port, () => {
  console.log(`Server started (http://localhost:${port}/)`);
});


//https://libralion.herokuapp.com/book


// const sql_insert = `INSERT INTO Books (Book_ID, Title, Author, Comments) VALUES
// (1, 'Mrs. Bridge', 'Evan S. Connell', 'First in the serie'),
// (2, 'Mr. Bridge', 'Evan S. Connell', 'Second in the serie'),
// (3, 'L''ingénue libertine', 'Colette', 'Minne + Les égarements de Minne');`;
//   db.run(sql_insert, err => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log("Successful creation of 3 books");
//   });