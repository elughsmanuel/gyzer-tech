import dotenv from 'dotenv';
dotenv.config();

const config = {
    development: {
        url: process.env.DB_URL_DEV,
        dialect: process.env.DB_DIALECT,
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //     },
        // }
    },
    test: {
        url: process.env.DB_URL_TEST,
        dialect: process.env.DB_DIALECT,
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //     },
        // }
    },
    production: {
        url: process.env.DB_URL_PROD,
        dialect: process.env.DB_DIALECT,
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //     },
        // }
    },
};

export default config;
module.exports = config;
