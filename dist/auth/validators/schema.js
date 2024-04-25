"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordSchema = exports.updateUserRoleSchema = exports.updateUserSchema = exports.resetPasswordSchema = exports.emailSchema = exports.loginSchema = exports.signUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("../utils/constants");
exports.signUpSchema = joi_1.default.object({
    firstName: joi_1.default.string().trim().required().messages({
        "any.required": constants_1.FIRST_NAME_REQUIRED,
        "string.empty": constants_1.EMPTY_FIRST_NAME,
    }),
    lastName: joi_1.default.string().trim().required().messages({
        "any.required": constants_1.LAST_NAME_REQUIRED,
        "string.empty": constants_1.EMPTY_LAST_NAME,
    }),
    email: joi_1.default.string().trim().email().required().lowercase().messages({
        "any.required": constants_1.EMAIL_REQUIRED,
        "string.empty": constants_1.EMPTY_EMAIL,
        "string.email": constants_1.VALID_EMAIL,
    }),
    username: joi_1.default.string().trim().required().messages({
        "any.required": constants_1.USERNAME_REQUIRED,
        "string.empty": constants_1.EMPTY_USERNAME,
    }),
    password: joi_1.default.string().trim().min(8).required().messages({
        "any.required": constants_1.PASSWORD_REQUIRED,
        "string.empty": constants_1.EMPTY_PASSWORD,
        "string.min": constants_1.VALID_PASSWORD,
    }),
    confirmPassword: joi_1.default.any().valid(joi_1.default.ref("password")).required().messages({
        "any.only": constants_1.MATCHING_PASSWORD,
        "any.required": constants_1.CONFIRM_PASSWORD_REQUIRED,
        "string.empty": constants_1.EMPTY_CONFIRM_PASSWORD,
    }),
    managerId: joi_1.default.number().integer().required().messages({
        "any.required": 'MANAGER ID REQUIRED',
        "string.empty": 'EMPTY MANAGER ID',
        "number.base": "MANAGER ID NUMBER",
        "number.integer": 'MANAGER ID INTEGER',
    }),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().trim().email().required().lowercase().messages({
        "any.required": constants_1.EMAIL_REQUIRED,
        "string.empty": constants_1.EMPTY_EMAIL,
        "string.email": constants_1.VALID_EMAIL,
    }),
    password: joi_1.default.string().trim().required().messages({
        "any.required": constants_1.PASSWORD_REQUIRED,
        "string.empty": constants_1.EMPTY_PASSWORD,
    }),
});
exports.emailSchema = joi_1.default.object({
    email: joi_1.default.string().trim().email().required().lowercase().messages({
        "any.required": constants_1.EMAIL_REQUIRED,
        "string.empty": constants_1.EMPTY_EMAIL,
        "string.email": constants_1.VALID_EMAIL,
    }),
});
exports.resetPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().trim().email().required().lowercase().messages({
        "any.required": constants_1.EMAIL_REQUIRED,
        "string.empty": constants_1.EMPTY_EMAIL,
        "string.email": constants_1.VALID_EMAIL,
    }),
    password: joi_1.default.string().trim().min(8).required().messages({
        "any.required": constants_1.PASSWORD_REQUIRED,
        "string.empty": constants_1.EMPTY_PASSWORD,
        "string.min": constants_1.VALID_PASSWORD,
    }),
    confirmPassword: joi_1.default.any().valid(joi_1.default.ref("password")).required().messages({
        "any.only": constants_1.MATCHING_PASSWORD,
        "any.required": constants_1.CONFIRM_PASSWORD_REQUIRED,
        "string.empty": constants_1.EMPTY_CONFIRM_PASSWORD,
    }),
});
exports.updateUserSchema = joi_1.default.object({
    firstName: joi_1.default.string().trim(),
    lastName: joi_1.default.string().trim(),
    email: joi_1.default.string().trim().email().lowercase().messages({
        "string.email": "Please provide a valid email address",
    }),
    username: joi_1.default.string().trim(),
    managerId: joi_1.default.number().integer(),
});
exports.updateUserRoleSchema = joi_1.default.object({
    role: joi_1.default.string().valid('staff', 'manager', 'admin').required().messages({
        "any.required": constants_1.ROLE_REQUIRED,
        "string.empty": constants_1.EMPTY_ROLE,
    }),
});
exports.updatePasswordSchema = joi_1.default.object({
    password: joi_1.default.string().trim().min(8).required().messages({
        "any.required": constants_1.PASSWORD_REQUIRED,
        "string.empty": constants_1.EMPTY_PASSWORD,
        "string.min": constants_1.VALID_PASSWORD,
    }),
    newPassword: joi_1.default.string().trim().min(8).required().messages({
        "any.required": constants_1.PASSWORD_NEW_REQUIRED,
        "string.empty": constants_1.EMPTY_NEW_PASSWORD,
        "string.min": constants_1.VALID_NEW_PASSWORD,
    }),
    confirmPassword: joi_1.default.any().valid(joi_1.default.ref("newPassword")).required().messages({
        "any.only": constants_1.MATCHING_PASSWORD,
        "any.required": constants_1.CONFIRM_PASSWORD_REQUIRED,
        "string.empty": constants_1.EMPTY_CONFIRM_PASSWORD,
    }),
});
