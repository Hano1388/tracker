const options = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/chat-tracker',
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds/production',
        },
    },
};

const environment = process.env.NODE_ENV || 'development',
      config      = options[environment];

module.exports = require('knex')(config);