"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const constants_1 = require("../auth/utils/constants");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkInsert("users", [
                {
                    firstName: process.env.ADMIN_FIRST_NAME,
                    lastName: process.env.ADMIN_LAST_NAME,
                    email: process.env.ADMIN_EMAIL,
                    username: process.env.ADMIN_USERNAME,
                    password: yield bcryptjs_1.default.hash(`${process.env.ADMIN_PASSWORD}`, Number(process.env.BCRYPT_SALT)),
                    role: constants_1.ADMIN,
                    managerId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ], {});
        });
    },
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete("users", {}, {});
        });
    },
};
