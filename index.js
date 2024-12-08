require('dotenv').config(); // Load .env file
const express = require('express'); // Import the express dependency
const { Pool } = require('pg'); // Import PostgreSQL client
const app = express(); // Instantiate an express app, the main workhorse of this server
const port = 5000; // Save the port number where your server will be listening

// Set up PostgreSQL connection pool
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
    } else {
        console.log('Database connected successfully:', res.rows[0]);
    }
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

// Custom calculation route
function sikCalc(a, b) {
    return a * b;
}

app.get('/sikander', (req, res) => {
    let c = 5,
        d = 6;
    let result = sikCalc(c, d);

    let finalString = 'Hello I am Sikander   ' + result.toString();

    res.send(finalString);
});

// Add a new route to query the database
app.get('/db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()'); // Example query
        res.send(`Database time: ${result.rows[0].now}`);
    } catch (err) {
        console.error('Error executing query:', err.stack);
        res.status(500).send('Database query failed');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
