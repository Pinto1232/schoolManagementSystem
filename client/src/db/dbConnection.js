const express = require('express');
const app = express();
const mysql = require('mysql2');

// parse incoming request bodies in a middleware before your handlers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pintop@ssw0rdrj200100p',
  database: 'schooldb'
});

// create a route to handle login requests
app.put('/login', (req, res) => {
  const { email, password } = req.body;
  // check if the email and password provided match a user in the database
  connection.query(
    'SELECT * FROM Login WHERE username = ? AND password = ?',
    [username, password],
    (error, results) => {
      if (error) {
        // handle the error
        return res.status(500).json({ error });
      }
      if (results.length > 0) {
        // the email and password match a user in the database, so return a success message
        return res.json({ message: 'Success' });
      } else {
        // the email and password do not match any user in the database, so return an error message
        return res.status(400).json({ message: 'Email or password is incorrect' });
      }
    }
  );
});

// create a route to handle registration requests
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  // check if the email already exists in the database
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        // handle the error
        return res.status(500).json({ error });
      }
      if (results.length > 0) {
        // the email already exists, so return an error message
        return res.status(400).json({ message: 'Email already exists' });
      } else {
        // the email does not exist, so insert the new user into the database
        connection.query(
          'INSERT INTO users (email, password) VALUES (?, ?)',
          [email, password],
          (error) => {
            if (error) {
              // handle the error
              return res.status(500).json({ error });
            }
            return res.json({ message: 'Success' });
          }
        );
      }
    }
  );
});

// start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
