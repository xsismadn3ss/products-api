const dotenv = require('dotenv');
dotenv.config()

const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    env: process.env.NODE_ENV || 'development'
}

module.exports = config