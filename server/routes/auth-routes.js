const express = require('express')

const router = express.Router();

//middleware
const {authCheck} = require('../middlewares/auth')

//controller
const {loginUser, createOrUpdateUser, currentUser} = require('../controllers/auth-controllers')

//send to back end through the '/' then middleware handle the req, res, then coltroller deals with database
router.post('/login-user',authCheck, loginUser);
router.post('/create-or-update-user',authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);

module.exports = router;