'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const constants_1 = require("../auth/utils/constants");
class User extends sequelize_1.Model {
}
User.init({
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
}, {
    sequelize: _1.default,
    modelName: 'user',
    tableName: 'users',
});
exports.default = User;
