const {Router} = require('express');
const { NewsContollers } = require('../Controllers/News.Controllers');
const router = Router();


router.get('/news',NewsContollers);

module.exports = router;