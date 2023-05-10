const express = require('express');
const router = express.Router();

const newsController = require('../controllers/newsController');
const { errorHandler } = require('../middlewares/errorHandler');

router.get('/news', newsController.getNews);

router.use(errorHandler);

module.exports = router;
