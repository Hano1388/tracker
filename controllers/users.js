const knex = require('../db/knex');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const { email, password } = req.value.body;
            // check if there is a user with the same email
            const foundUser = await knex.select().from('users').where('email', email).first();

            if(foundUser) { return res.json({ email: 'already exist' }) };
            
            // create user
            await knex('users').insert({ email, password });
            // respond with a token
            res.json({ user: 'created!' });
            // console.log('User Created Successfully! 👍');
            
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
