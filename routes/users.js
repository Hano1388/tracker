const express          = require('express'),
       router          = express.Router(),
       usersController = require('../controllers/users');

router.route('/signup')
      .post(usersController.signUp);

router.route('/signin')
      .post(usersController.signIn);

router.route('/secret')
      .post(usersController.secret);

module.exports = router;
