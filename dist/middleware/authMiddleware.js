"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const constants_1 = require("../auth/utils/constants");
const SECRET_KEY = String(process.env.JWT_SECRET);
// Middleware to authenticate a user
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            success: false,
            error: constants_1.AUTH_TOKEN_REQUIRED,
        });
    }
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decodedUser) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    error: constants_1.AUTH_TOKEN_EXPIRED,
                });
            }
            else {
                return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({
                    success: false,
                    error: constants_1.AUTH_TOKEN_PERMISSION,
                });
            }
        }
        // Attach the decoded user information
        req.user = decodedUser;
        // For authenticated requests
        // Attach the user ID separately
        req.userId = decodedUser.userId;
        // Attach the role separately
        req.role = decodedUser.role;
        next();
    });
};
exports.authenticate = authenticate;
const isAdmin = (req, res, next) => {
    // Extract decoded user information
    // To retrieve the role
    const decodedUser = req.user;
    if (decodedUser && decodedUser.role === constants_1.ADMIN) {
        next();
    }
    else {
        return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({
            success: false,
            error: constants_1.AUTH_TOKEN_PERMISSION,
        });
    }
};
exports.isAdmin = isAdmin;
