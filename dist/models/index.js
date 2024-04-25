"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = __importDefault(require("../config/config"));
let sequelize;
if (config_1.default.development) {
    sequelize = new sequelize_1.Sequelize(process.env.DB_URL_DEV, {
        dialect: 'postgres',
    });
}
else if (config_1.default.test) {
    sequelize = new sequelize_1.Sequelize(process.env.DB_URL_TEST, {
        dialect: 'postgres',
    });
}
else if (config_1.default.production) {
    sequelize = new sequelize_1.Sequelize(process.env.DB_URL_PROD, {
        dialect: 'postgres',
    });
}
exports.default = sequelize;
