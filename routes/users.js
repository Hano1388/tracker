const express                   = require('express'),
       router                   = express.Router(),
       passport                 = require('passport'),
       passportConfig           = require('../config/passport');
       UsersController          = require('../controllers/users'),
       { validateBody, schemas } = require('../helpers/routeHelpers');

const serverValidation    = validateBody(schemas.authSchema),
      localAuthentication = passport.authenticate('local', { session: false }),
      jwtAuthentication   = passport.authenticate('jwt', { session: false });

router.route('/signup')
      .post(serverValidation, UsersController.signUp);

router.route('/signin')
      .post(serverValidation, localAuthentication, UsersController.signIn);

router.route('/secret')
      .get(jwtAuthentication, UsersController.secret);

module.exports = router;
