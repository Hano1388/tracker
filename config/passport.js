const passport       = require('passport'),
      JwtStrategy    = require('passport-jwt').Strategy,
      { ExtractJwt}  = require('passport-jwt'),
      LocalStrategy  = require('passport-local').Strategy,
      bcrypt         = require('bcryptjs'),
      { JWT_SECRET } = require('./index'),
      knex           = require('../db/knex');

findUserById = id => {
    return knex.select().from('users').where('id', id).first();
};

findUserByEmail = email => {
    return knex.select().from('users').where('email', email).first();
};

isValidPassword = (userPassword, databasePassword) => {
    console.log('userPassword: ', userPassword);
    console.log('databasePassword: ', databasePassword);
    return bcrypt.compare(userPassword, databasePassword);
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
    try {
        // Find the user given the email
        console.log('user email: ', email);
        const user = await findUserByEmail(email.toLocaleLowerCase());
        console.log('user: ', user);
        // If not, handle it 
        if(!user) { return done(null, false) };
        // Check if the password is correct
        const isMatch = await isValidPassword(password, user.password);
        console.log('isMatch: ', isMatch);
        // If not, handle it
        if(!isMatch) { return done(null, false) };
        // Otherwise, return the user
        done(null, user);
    } catch(error) {
        done(error, false);
    }
}));
