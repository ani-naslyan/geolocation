const express = require('express');
const bodyParser = require('body-parser');
const twit = require('./public/twitter');
const map = require("./public/maps");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index', {});
});

app.post('/s', (req, res) => {
    const k = req.body.k;
    twit.search(k, statuses => {
        res.json({ search: statuses });
    });
    console.log(map, "map");
});

app.listen(port, () => console.log(`Twitter app listening on port ${port}!`));