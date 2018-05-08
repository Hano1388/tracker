const JWT            = require('jsonwebtoken'),
      bcrypt         = require('bcryptjs'),
      knex           = require('../db/knex'),
      { JWT_SECRET } = require('../config');

findUserByEmail = email => {
    return knex.select().from('users').where('email', email).first();
};

signToken = user => {
    return JWT.sign({
        iss: 'youtuber',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        try {
            let { email, password } = req.value.body;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            // check if there is a user with the same email
            email = email.toLowerCase();
            const foundUser = await findUserByEmail(email);

            if(foundUser) { return res.json({ email: 'already exist' }) };

            // create user
            await knex('users').insert({ email, password: hash });
            // respond with a token
            const user = await findUserByEmail(email);
            const token = await signToken(user);
            res.status(200).json({ token });
            
        } catch(error) {
            next(error);
        }
    },

    signIn: async (req, res, next) => {
        try {
            const token = signToken(req.user);
            res.status(200).json({ token });
        } catch(error) {
            next(error);
        }
    },

    secret: async(req, res, next) => {
        try {
            console.log('I managed to get here!');
            res.json({ secret: 'resources' });
        } catch (error) {
            next(error);
        }
    }
}
