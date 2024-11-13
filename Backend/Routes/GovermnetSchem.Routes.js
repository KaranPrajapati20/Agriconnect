const {Router} = require('express');
const { GovermentSchems } = require('../Controllers/GovermentSchem.Contollers');
const router = Router();


router.get('/goverment-schem',GovermentSchems);

module.exports = router;