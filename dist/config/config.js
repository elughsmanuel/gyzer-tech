"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        url: process.env.DB_URL_DEV,
        dialect: process.env.DB_DIALECT,
    },
    test: {
        url: process.env.DB_URL_TEST,
        dialect: process.env.DB_DIALECT,
    },
    production: {
        url: process.env.DB_URL_PROD,
        dialect: process.env.DB_DIALECT,
    },
};
exports.default = config;
module.exports = config;
