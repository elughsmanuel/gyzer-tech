'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {import('sequelize-cli').Migration} */
const sequelize_1 = require("sequelize");
const constants_1 = require("../auth/utils/constants");
module.exports = {
    up(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable('users', {
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                firstName: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: constants_1.FIRST_NAME_REQUIRED,
                        },
                    },
                },
                lastName: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: constants_1.LAST_NAME_REQUIRED,
                        },
                    },
                },
                email: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    unique: {
                        name: constants_1.UNIQUE_EMAIL_CODE,
                        msg: constants_1.UNIQUE_EMAIL,
                    },
                    validate: {
                        notEmpty: {
                            msg: constants_1.EMAIL_REQUIRED,
                        },
                    },
                },
                username: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    unique: {
                        name: constants_1.UNIQUE_USERNAME_CODE,
                        msg: constants_1.UNIQUE_USERNAME,
                    },
                    validate: {
                        notEmpty: {
                            msg: constants_1.USERNAME_REQUIRED,
                        },
                    },
                },
                password: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: constants_1.PASSWORD_REQUIRED,
                        },
                    },
                },
                role: {
                    type: sequelize_1.DataTypes.ENUM(constants_1.STAFF, constants_1.MANAGER, constants_1.ADMIN),
                    allowNull: false,
                    defaultValue: constants_1.STAFF,
                },
                managerId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: "MANAGER ID REQUIRED",
                        },
                    },
                },
                resetPasswordToken: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true,
                },
                resetPasswordExpires: {
                    type: sequelize_1.DataTypes.DATE,
                    allowNull: true,
                },
                createdAt: sequelize_1.DataTypes.DATE,
                updatedAt: sequelize_1.DataTypes.DATE,
            });
        });
    },
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('users');
        });
    },
};
