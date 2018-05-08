const passport       = require('passport'),
      JwtStrategy    = require('passport-jwt').Strategy,
      { ExtractJwt}  = require('passport-jwt'),
      { JWT_SECRET } = require('./index'),
      knex           = require('../db/knex');

findUserById = id => {
    return knex.select().from('users').where('id', id).first();
}

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        // Find the user specified in the token
        const user = await findUserById(payload.sub);
        // If the user doesn't exist, handle it
        if(!user) { return done(null, false) };
        // Otherwise, return user
        done(null, user);

    } catch(error) {
        done(error, false);
    }
}));