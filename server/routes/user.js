const express = require('express')
const { check } = require('express-validator');
const router = express.Router();
const usersController = require('../controllers/users-controllers');

//route
router.get('/user', (req, res) => { 
    //
    res.json({
        data: 'hey you hit user endpoint',
    });
});

router.post(
    '/users/signup',
    [
      check('firstname')
        .not()
        .isEmpty(),
      check('lastname')
        .not()
        .isEmpty(), 
      check('email')
        .normalizeEmail() // Test@test.com => test@test.com
        .isEmail(),
      check('password').isLength({ min: 6 })
    ],
    usersController.signup
);

router.get('/users/:id',usersController.getUsers);
  
router.post('/users/login', usersController.login);

router.post('/users/resetpassword',usersController.reset_password);

router.put('/users/resetpassword',usersController.success_reset);

router.get('/users/verification',usersController.verification);

router.post('/users/changepassword',usersController.changepassword);
router.post('/users/judgmentpassword',usersController.judgmentpassword);


router.put('/users',usersController.update);

router.post('/users/comments',usersController.getComments);
router.put('/users/comment',usersController.updateComment);

router.get('/json',usersController.json);


router.post('/users/token',usersController.getToken);



module.exports = router;