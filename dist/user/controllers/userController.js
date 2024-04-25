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
exports.deleteUser = exports.updateUserRole = exports.updateUser = exports.deleteMe = exports.updateMyPassword = exports.updateMyProfile = exports.getMyProfile = exports.getUserById = exports.getAllUsers = void 0;
const http_status_codes_1 = require("http-status-codes");
const userService_1 = __importDefault(require("../services/userService"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const schema_1 = require("../../auth/validators/schema");
const userRepository = new userRepository_1.default();
const userService = new userService_1.default(userRepository);
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, perPage, role, } = req.query;
        const users = yield userService.getAllUsers(parseFloat(page) || '1', parseFloat(perPage || '10'), role);
        return res.status(http_status_codes_1.StatusCodes.OK).json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield userService.getUserById(Number(userId));
        return res.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
const getMyProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getMyProfile(Number(req.userId));
        return res.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getMyProfile = getMyProfile;
const updateMyProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = yield schema_1.updateUserSchema.validateAsync(req.body);
        const user = yield userService.updateMyProfile(Number(req.userId), schema);
        return res.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.updateMyProfile = updateMyProfile;
const updateMyPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = yield schema_1.updatePasswordSchema.validateAsync(req.body);
        const updateMyPassword = yield userService.updateMyPassword(Number(req.userId), schema.password, schema.newPassword, schema.confirmPassword);
        return res.status(http_status_codes_1.StatusCodes.OK).json(updateMyPassword);
    }
    catch (error) {
        next(error);
    }
});
exports.updateMyPassword = updateMyPassword;
const deleteMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteMe = yield userService.deleteMe(Number(req.userId));
        return res.status(http_status_codes_1.StatusCodes.OK).json(deleteMe);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteMe = deleteMe;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const schema = yield schema_1.updateUserSchema.validateAsync(req.body);
        const user = yield userService.updateUser(Number(userId), schema);
        return res.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const updateUserRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const schema = yield schema_1.updateUserRoleSchema.validateAsync(req.body);
        const user = yield userService.updateUserRole(Number(userId), schema.role);
        return res.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserRole = updateUserRole;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const deleteUser = yield userService.deleteUser(Number(userId));
        return res.status(http_status_codes_1.StatusCodes.OK).json(deleteUser);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
