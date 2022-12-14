import express, { Application, NextFunction } from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const corsProps = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsProps));
app.use(express.json());

const client = new pg.Client({
  host: process.env.HOST,
  port: parseInt(String(process.env.PORT), 10),
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

client.connect();

app.get("/:schema/:month", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  client.query(
    `SELECT * FROM "${req.params.schema}"."${req.params.month}"`,
    (err, res2) => {
      if (!err) {
        res.send(res2.rows);
        res.status(202);
      } else {
        console.log(err.message);
      }
    }
  );
});
app.get("/:schema/:month/:day", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  client.query(
    `SELECT * FROM "${req.params.schema}"."${req.params.month}" WHERE id=${req.params.day}`,
    (err, res2) => {
      if (!err) {
        res.send(res2.rows);
        res.status(200);
      } else {
        console.log(err.message);
      }
    }
  );
});
app.post("/:schema/:month/:day/:hour", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  const data = JSON.stringify(req.body);
  client.query(
    `UPDATE "${req.params.schema}"."${req.params.month}" SET "${req.params.hour}" = '${data}' WHERE id=${req.params.day}`
  );
  res.send(req.body);
  res.status(201);
});

app.listen(5000, () => console.log("Server running"));
