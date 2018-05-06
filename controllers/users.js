const knex = require('../db/knex');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            // console.log('reques body', req.value.body);
            const { email, password } = req.value.body;
            await knex('users').insert({ email, password });
            res.json({ user: 'created!' })
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
