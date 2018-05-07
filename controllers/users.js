const knex = require('../db/knex');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const { email, password } = req.value.body;
            let foundUser;
            // check if there is a user with the same email
            let user = await knex.select().from('users').where('email', email)
            if(user[0] !== undefined) {
                foundUser = user[0].email;
            }

            if(!foundUser) {
                // create user
                await knex('users').insert({ email, password });
                // respond with a token
                // res.json({ user: 'created!' });
                console.log('User Created Successfully! 👍');
            } else {
                // res.json({ email: 'already exist' });
                console.log('User already exist');
            }
            
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
