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
const crypto_1 = __importDefault(require("crypto"));
const Unauthenticated_1 = __importDefault(require("../../errors/Unauthenticated"));
const BadRequest_1 = __importDefault(require("../../errors/BadRequest"));
const UnprocessableEntity_1 = __importDefault(require("../../errors/UnprocessableEntity"));
const constants_1 = require("../utils/constants");
const token_1 = require("../utils/token");
const mailer_1 = __importDefault(require("../../utils/mailer"));
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    signUp(firstName, lastName, email, username, password, confirmPassword, managerId, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailExist = yield this.userRepository.findByEmail(email);
            if (emailExist) {
                throw new UnprocessableEntity_1.default(constants_1.UNIQUE_EMAIL);
            }
            const usernameExist = yield this.userRepository.findByUsername(username);
            if (usernameExist) {
                throw new UnprocessableEntity_1.default(constants_1.UNIQUE_USERNAME);
            }
            // Password matching
            if (password !== confirmPassword) {
                throw new UnprocessableEntity_1.default(constants_1.MATCHING_PASSWORD);
            }
            // Hash the new password and update the user's password
            const salt = yield bcryptjs_1.default.genSalt(Number(process.env.BCRYPT_SALT));
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            const user = yield this.userRepository.createUser(firstName, lastName, email, username, hashedPassword, managerId);
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
            // Generate an access token for the user
            const accessToken = (0, token_1.createToken)(res, user.id.toString(), user.role);
            const welcomeUrl = `${req.protocol}://${req.get('host')}/home`;
            yield new mailer_1.default(user, welcomeUrl).sendWelcome();
            return {
                success: true,
                data: userData,
                accessToken,
            };
        });
    }
    login(email, password, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            if (!user) {
                throw new Unauthenticated_1.default(constants_1.WRONG_CREDENTIALS);
            }
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Unauthenticated_1.default(constants_1.WRONG_CREDENTIALS);
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
            // Generate an access token for the authenticated user
            const accessToken = (0, token_1.generateToken)(res, user.id.toString(), user.role);
            return {
                success: true,
                userData,
                accessToken,
            };
        });
    }
    forgotPassword(email, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            if (!user) {
                throw new BadRequest_1.default(constants_1.USER_NOT_FOUND);
            }
            // Generate a reset token and set its expiration time
            const generateResetToken = () => {
                const token = crypto_1.default.randomBytes(32).toString('hex');
                return token;
            };
            const resetToken = generateResetToken();
            // Hash the new token going to the database
            const hashedToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
            const tokenExpiresIn = Number(process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN);
            const expirationTime = new Date(Date.now() + tokenExpiresIn * 60 * 1000);
            yield this.userRepository.updateUserResetToken(user.id, hashedToken, expirationTime);
            const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
            // Send a reset password email to the user
            yield new mailer_1.default({
                email: user.email,
                firstName: user.firstName,
            }, resetURL).sendResetPasswordEmail();
            return {
                success: true,
                message: constants_1.FORGOT_PASSWORD_REQUESTED,
            };
        });
    }
    resetPassword(email, token, password, confirmPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            if (password !== confirmPassword) {
                throw new UnprocessableEntity_1.default(constants_1.MATCHING_PASSWORD);
            }
            const user = yield this.userRepository.findByEmail(email);
            if (!user) {
                throw new BadRequest_1.default(constants_1.USER_NOT_FOUND);
            }
            // Hash the new token coming from the email
            const hashedToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
            const validToken = yield this.userRepository.findByResetToken(email, hashedToken);
            if (!validToken) {
                throw new BadRequest_1.default(constants_1.INVALID_TOKEN);
            }
            // Hash the new password and update the user's password
            const salt = yield bcryptjs_1.default.genSalt(Number(process.env.BCRYPT_SALT));
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            yield this.userRepository.updateUserPassword(user.id, hashedPassword);
            // Clear the user's reset token
            yield this.userRepository.clearUserResetToken(user.id);
            return {
                success: true,
                message: constants_1.PASSWORD_CHANGED,
            };
        });
    }
}
exports.default = AuthService;
