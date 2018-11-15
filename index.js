const express = require('express');
const bodyParser = require('body-parser');
const twitter = require('./twitter');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = 3001;

app.set('view engine', 'ejs');

app.use((req, res, next) => { // middleware
  req.chanj = "Some text";
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/search', (req, res) => {
  const query = req.body.query;
  twitter.query(query, val => {
        res.json({ post:  val });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));