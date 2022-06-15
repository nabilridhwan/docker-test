const express = require("express");
const app = express();
const { Pool } = require("pg");

const cors = require("cors");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "example",
    port: 5430,
});

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/test", async (req, res) => {
    const data = await pool.query('SELECT * FROM "user"');
    return res.json(data.rows);
});

app.post("/test", async (req, res) => {
    const { name, email } = req.body;
    const data = await pool.query(
        'INSERT INTO "user" (name, email) VALUES ($1, $2)',
        [name, email]
    );
    return res.json(data.rows);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
