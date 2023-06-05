const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "haider123",
  database: "crudreact"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/post", (req, res) => {

    const { name, email, contact } = req.body;
    // Insert data into the database
    const query = 'INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)';
    db.query(query, [name, email, contact], (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Error inserting data');
      } else {
        console.log('Data inserted successfully');
        res.status(200).send('Data inserted successfully');
      }
    });
  });

app.get("/api/get", (req, res) => {
  const selectQuery = "SELECT * FROM contact_db";
  db.query(selectQuery, (error, results) => {
    if (error) {
      console.error('Error retrieving data:', error);
      res.status(500).send('Error retrieving data');
    } else {
      res.send(results);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const selectQuery = "SELECT * FROM contact_db WHERE id = ?";
  db.query(selectQuery, id , (error, results) => {
    if (error) {
      console.error('Error retrieving data:', error);
      res.status(500).send('Error retrieving data');
    } else {
      res.send(results);
    }
  });
});


// app.get("/api/get/:id", (req, res) => {
//   const { id } = req.params;
//   const selectQuery = "SELECT * FROM contact_db WHERE id = ?";
//   db.query(selectQuery, id , (error, results) => {
//     if (error) {
//       console.error('Error retrieving data:', error);
//       res.status(500).send('Error retrieving data');
//     } else {
//       res.send(results);
//     }
//   });
// });

app.delete("/api/delete/:id", (req, res) => {
  const{ id }=req.params;
  const delquery = "Delete from contact_db WHERE id= ?";
  db.query(delquery, id,  (error, results) => {
    if (error) {
      console.error('Error retrieving data:', error);
      res.status(500).send('Error retrieving data');
    } else {
      res.send(results);
    }
  });
});


app.put("/api/put/:id", (req, res) => {
  const { id } = req.params;
  const { name , email , contact } = req.body;
  const Query = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
  db.query(Query, [name , email , contact ,id] , (error, results) => {
    if (error) {
      console.error('Error retrieving data:', error);
      res.status(500).send('Error retrieving data');
    } else {
      res.send(results);
    }
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
