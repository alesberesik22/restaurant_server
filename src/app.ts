import express, {Application, NextFunction} from 'express'
import pg from 'pg'

const app: Application = express();
app.use(express.json());

const client = new pg.Client({
    host: "ella.db.elephantsql.com",
    port: 5432,
    user: "bheompxz",
    password: "mORN2xNb8uyY1mfF-8Rza2qvxHQhYy10",
    database:"bheompxz"
})

client.connect();



app.get('/:schema/:month', (req, res, next) => {
    client.query(`SELECT * FROM "${req.params.schema}"."${req.params.month}"`, (err, res2) => {
    if (!err) {
        res.send(res2.rows);
        res.status(202);
    } else {
        console.log(err.message);
    }
})
})
app.get('/:schema/:month/:day', (req, res, next) => {
    client.query(`SELECT * FROM "${req.params.schema}"."${req.params.month}" WHERE id=${req.params.day}`, (err, res2) => {
    if (!err) {
        res.send(res2.rows);
        res.status(200);
    } else {
        console.log(err.message);
    }
})
})
app.post('/:schema/:month/:day/:hour', (req, res) => {
    const data = JSON.stringify(req.body);
    client.query(`UPDATE "${req.params.schema}"."${req.params.month}" SET "${req.params.hour}" = '${data}' WHERE id=${req.params.day}`)
    res.send(req.body);
    res.status(201);
})

app.listen(5000, () => console.log("Server running"));