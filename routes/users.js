const express                   = require('express'),
       router                   = express.Router(),
       passport                 = require('passport'),
       passportConfig           = require('../config/passport');
       UsersController          = require('../controllers/users'),
       { validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/signup')
      .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
      // .post(validateBody(schemas.authenticate), passport.authenticate('local', { session: false }), UsersController.signIn);
      .post(passport.authenticate('local', { session: false }), UsersController.signIn);

router.route('/secret')
      .get(passport.authenticate('jwt', { session: false }), UsersController.secret);

module.exports = router;
