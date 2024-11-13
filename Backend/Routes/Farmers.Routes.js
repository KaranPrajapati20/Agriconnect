const {Router} = require('express');
const {SignIn,SignUp} = require('../Controllers/Farmers.Contollers');
const router = Router();


router.post('/sign-up',SignUp);
router.post('/sign-in',SignIn);
router.post('/logout',SignIn);

module.exports = router;