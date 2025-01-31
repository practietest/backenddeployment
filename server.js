const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection
const connection = mysql.createConnection({
  host: 'examdatabase.cluk60aaw3od.ap-south-1.rds.amazonaws.com', // from AWS RDS
  user: 'admin',
  password: 'examroot',
  database: 'railwayexam'
});

// Test DB connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// API to fetch admin details
app.get('/admins', (req, res) => {
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error("yess",err)
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
