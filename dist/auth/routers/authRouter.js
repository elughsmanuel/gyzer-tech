"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authRouter = express_1.default.Router();
authRouter.post('/sign-up', authController_1.signUp);
authRouter.post('/login', authController_1.login);
authRouter.post('/forgot-password', authController_1.forgotPassword);
authRouter.patch('/reset-password', authController_1.resetPassword);
exports.default = authRouter;
