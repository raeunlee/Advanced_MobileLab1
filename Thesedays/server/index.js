const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

const config = require('./config');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});


const port = config.port || 6000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
