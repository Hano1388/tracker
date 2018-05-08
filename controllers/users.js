const JWT  = require('jsonwebtoken'),
      knex = require('../db/knex');

findUserByEmail = email => {
    return knex.select().from('users').where('email', email).first();
}

signToken = user => {
    return JWT.sign({
        iss: 'youtuber',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, 'youruberauthentication');
}

module.exports = {
    signUp: async (req, res, next) => {
        try {
            let { email, password } = req.value.body;
            // check if there is a user with the same email
            email = email.toLowerCase();
            const foundUser = await findUserByEmail(email);

            if(foundUser) { return res.json({ email: 'already exist' }) };

            // create user
            await knex('users').insert({ email, password });
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
            console.log('signIn function called');
        } catch(error) {
            next(error);
        }
    },

    secret: async(req, res, next) => {
        try {
            console.log('secret function called');
        } catch (error) {
            next(error);
        }
    }
}
