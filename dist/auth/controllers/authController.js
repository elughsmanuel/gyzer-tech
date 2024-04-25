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
exports.resetPassword = exports.forgotPassword = exports.login = exports.signUp = void 0;
const http_status_codes_1 = require("http-status-codes");
const schema_1 = require("../validators/schema");
const authService_1 = __importDefault(require("../services/authService"));
const userRepository_1 = __importDefault(require("../../user/repositories/userRepository"));
const userRepository = new userRepository_1.default();
const authService = new authService_1.default(userRepository);
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = yield schema_1.signUpSchema.validateAsync(req.body);
        const signUp = yield authService.signUp(schema.firstName, schema.lastName, schema.email, schema.username, schema.password, schema.confirmPassword, schema.managerId, req, res);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(signUp);
    }
    catch (error) {
        next(error);
    }
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = yield schema_1.loginSchema.validateAsync(req.body);
        const login = yield authService.login(schema.email, schema.password, res);
        return res.status(http_status_codes_1.StatusCodes.OK).json(login);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = yield schema_1.emailSchema.validateAsync(req.body);
        const forgotPassword = yield authService.forgotPassword(schema.email, req);
        return res.status(http_status_codes_1.StatusCodes.OK).json(forgotPassword);
    }
    catch (error) {
        next(error);
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query;
        const schema = yield schema_1.resetPasswordSchema.validateAsync(req.body);
        const forgotPassword = yield authService.resetPassword(String(schema.email), String(token), schema.password, schema.confirmPassword);
        return res.status(http_status_codes_1.StatusCodes.OK).json(forgotPassword);
    }
    catch (error) {
        next(error);
    }
});
exports.resetPassword = resetPassword;
