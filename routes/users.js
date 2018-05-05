const express                   = require('express'),
       router                   = express.Router(),
       usersController          = require('../controllers/users'),
       { validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/signup')
      .post(validateBody(schemas.authSchema), usersController.signUp);

router.route('/signin')
      .post(usersController.signIn);

router.route('/secret')
      .get(usersController.secret);

module.exports = router;
