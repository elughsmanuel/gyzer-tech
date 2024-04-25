"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Function to create a JWT token - for sign up
const createToken = (res, userId, role) => {
    const token = setToken(userId, role);
    createCookie(res, token);
    return token;
};
exports.createToken = createToken;
const setToken = (userId, role) => {
    const secret = String(process.env.JWT_SECRET);
    const expiresIn = process.env.JWT_EXPIRES_IN;
    return jsonwebtoken_1.default.sign({ userId, role }, secret, { expiresIn });
};
const createCookie = (res, accessToken) => {
    const cookieExpiresIn = Number(process.env.JWT_COOKIE_EXPIRES_IN);
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === 'production',
    };
    res.cookie('accessToken', accessToken, cookieOptions);
};
// Function to generate a JWT token - log in
const generateToken = (res, userId, role) => {
    const token = getToken(userId, role);
    getCookie(res, token);
    return token;
};
exports.generateToken = generateToken;
const getToken = (userId, role) => {
    const secret = String(process.env.JWT_SECRET);
    const expiresIn = process.env.JWT_EXPIRES_IN;
    return jsonwebtoken_1.default.sign({ userId, role }, secret, { expiresIn });
};
const getCookie = (res, accessToken) => {
    const cookieExpiresIn = Number(process.env.JWT_COOKIE_EXPIRES_IN);
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === 'production',
    };
    res.cookie('accessToken', accessToken, cookieOptions);
};
