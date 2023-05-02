const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const config = require('./config');

const routes = require('./routes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

routes(app);

const port = config.port || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
