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
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("../../models/user"));
class UserRepository {
    createUser(firstName, lastName, email, username, password, managerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: password,
                managerId: managerId,
            });
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({
                where: {
                    email: email,
                },
            });
            return user;
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({
                where: {
                    username: username,
                },
            });
            return user;
        });
    }
    updateUserResetToken(userId, token, expires) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield user_1.default.update({
                resetPasswordToken: token,
                resetPasswordExpires: expires,
            }, {
                where: { id: userId },
                returning: true,
            });
            return updatedUser;
        });
    }
    findByResetToken(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({
                where: {
                    email: email,
                    resetPasswordToken: token,
                    resetPasswordExpires: { [sequelize_1.Op.gt]: new Date() },
                },
            });
            return user;
        });
    }
    updateUserPassword(userId, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield user_1.default.update({
                password: hashedPassword,
            }, {
                where: { id: userId },
                returning: true,
            });
            return updatedUser;
        });
    }
    clearUserResetToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield user_1.default.update({
                resetPasswordToken: null,
                resetPasswordExpires: null,
            }, {
                where: { id: userId },
                returning: true,
            });
            return updatedUser;
        });
    }
    getAllUsers(role, skip, perPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            if (role) {
                query.role = role;
            }
            const users = yield user_1.default.findAll({
                where: query,
                offset: parseInt(skip, 10) || 0,
                limit: parseInt(perPage, 10) || undefined,
            });
            return users;
        });
    }
    getTotalUserCount(role) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield user_1.default.count({
                where: {
                    role: role,
                },
            });
            return count;
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findByPk(userId);
            return user;
        });
    }
    updateMyProfile(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield user_1.default.update(Object.assign({}, data), {
                where: { id: userId },
                returning: true,
            });
            const [_numAffectedRows, [updatedData]] = updatedUser;
            return updatedData;
        });
    }
    findPasswordByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findByPk(userId, {
                attributes: ['password'],
            });
            return user ? user.password : null;
        });
    }
    findByIdAndDelete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.destroy({
                where: {
                    id: userId,
                },
            });
            return user;
        });
    }
    updateUser(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield user_1.default.update(Object.assign({}, data), {
                where: { id: userId },
                returning: true,
            });
            const [_numAffectedRows, [updatedData]] = updatedUser;
            return updatedData;
        });
    }
    updateUserRole(userId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUserRole = yield user_1.default.update({
                role: role,
            }, {
                where: { id: userId },
                returning: true,
            });
            return updatedUserRole;
        });
    }
    findManagerById(managerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({
                where: {
                    managerId: managerId,
                },
            });
            return user;
        });
    }
    findRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({
                where: {
                    role: role,
                },
            });
            return user;
        });
    }
    getAllUsersForReminder() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.default.findAll();
            return users;
        });
    }
}
exports.default = UserRepository;
