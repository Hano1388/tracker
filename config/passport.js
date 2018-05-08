const passport       = require('passport'),
      JwtStrategy    = require('passport-jwt').Strategy,
      { ExtractJwt}  = require('passport-jwt'),
      LocalStrategy  = require('passport-local').Strategy,
      { JWT_SECRET } = require('./index'),
      knex           = require('../db/knex');

findUserById = id => {
    return knex.select().from('users').where('id', id).first();
};

findUserByEmail = email => {
    return knex.select().from('users').where('email', email).first();
}

// JSON WEB TOKENS STRATEGY
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

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    // Find the user given the email
    const user = await findUserByEmail(email);
    // If not, handle it 
    if (!user) { return done(null, false) };
    // Check if the password is correct

    // If not, handle it

    // Otherwise, return the user
}));
