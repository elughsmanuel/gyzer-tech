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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const BadRequest_1 = __importDefault(require("../../errors/BadRequest"));
const UnprocessableEntity_1 = __importDefault(require("../../errors/UnprocessableEntity"));
const constants_1 = require("../../auth/utils/constants");
const constants_2 = require("../utils/constants");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getAllUsers(page, perPage, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.userRepository.getTotalUserCount(role);
            // Calculate pagination values
            const skip = (page - 1) * perPage;
            const currentPage = Math.ceil(page);
            const totalPages = Math.ceil(count / perPage);
            const users = yield this.userRepository.getAllUsers(role, skip, perPage);
            const userData = users.map(user => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                role: user.role,
                managerId: user.managerId,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }));
            return {
                status: true,
                data: userData,
                currentPage: currentPage,
                totalPages: totalPages,
            };
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserById(userId);
            if (!user) {
                throw new BadRequest_1.default(constants_2.USER_NOT_FOUND);
            }
            const userData = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                role: user.role,
                managerId: user.managerId,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
            return {
                status: true,
                data: userData,
            };
        });
    }
    getMyProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserById(userId);
            if (!user) {
                throw new BadRequest_1.default(constants_2.USER_NOT_FOUND);
            }
            const userData = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                role: user.role,
                managerId: user.managerId,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
            return {
                status: true,
                data: userData,
            };
        });
    }
    updateMyProfile(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield this.userRepository.getUserById(userId);
            if (!userExist) {
                throw new BadRequest_1.default(constants_2.USER_NOT_FOUND);
            }
            const user = yield this.userRepository.updateMyProfile(userId, data);
            const userData = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                role: user.role,
                managerId: user.managerId,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
            return {
                status: true,
                data: userData,
            };
        });
    }
    updateMyPassword(userId, password, newPassword, confirmPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserById(userId);
            if (!user) {
                throw new BadRequest_1.default(constants_2.USER_NOT_FOUND);
            }
            const storedPassword = yield this.userRepository.findPasswordByUserId(userId);
            if (storedPassword === null) {
                throw new BadRequest_1.default(constants_1.INCORRECT_PASSWORD);
            }
            const isPasswordValid = yield bcryptjs_1.default.compare(password, storedPassword);
            if (!isPasswordValid) {
                throw new BadRequest_1.default(constants_1.INCORRECT_PASSWORD);
            }
            if (newPassword !== confirmPassword) {
                throw new UnprocessableEntity_1.default(constants_1.MATCHING_PASSWORD);
            }
            if (password === newPassword) {
                throw new UnprocessableEntity_1.default(constants_1.SAME_PASSWORD);
            }
            // Generate a hash for the new password and update the user's password
            const salt = yield bcryptjs_1.default.genSalt(Number(process.env.BCRYPT_SALT));
            const hashedPassword = yield bcryptjs_1.default.hash(newPassword, salt);
            yield this.userRepository.updateUserPassword(userId, hashedPassword);
            return {
                status: true,
                message: constants_1.PASSWORD_CHANGED,
            };
        });
    }
    deleteMe(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserById(userId);
            if (!user) {
                throw new BadRequest_1.default(constants_2.USER_NOT_FOUND);
            }
            yield this.userRepository.findByIdAndDelete(userId);
            return {
                status: true,
                message: constants_2.USER_DELETED,
            };
        });
    }
    updateUser(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield this.userRepository.getUserById(userId);
            if (!userExist) {
                throw new BadRequest_1.default(constants_2.USER_NOT_FOUND);
            }
            const user = yield this.userRepository.updateUser(userId, data);
            const userData = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                role: user.role,
                managerId: user.managerId,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
            return {
                status: true,
                data: userData,
            };
        });
    }
    updateUserRole(userId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserById(userId);
            if (!user) {
                throw new BadRequest_1.default(constants_2.USER_NOT_FOUND);
            }
            yield this.userRepository.updateUserRole(userId, role);
            const userData = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                role: role,
                managerId: user.managerId,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
            return {
                status: true,
                data: userData,
            };
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserById(userId);
            if (!user) {
                throw new BadRequest_1.default(constants_2.USER_NOT_FOUND);
            }
            yield this.userRepository.findByIdAndDelete(userId);
            return {
                status: true,
                message: constants_2.USER_DELETED,
            };
        });
    }
}
exports.default = UserService;
