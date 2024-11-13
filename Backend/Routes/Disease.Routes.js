const {Router} = require('express');
const { Disease_Details, Crops_Details } = require('../Controllers/Disease.Controllers.js');
const router = Router();


router.post('/disease-details',Disease_Details);
router.post('/tips-tricks',Crops_Details);

module.exports = router;