"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middleware/authMiddleware");
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
userRouter.get('/', authMiddleware_1.authenticate, authMiddleware_1.isAdmin, userController_1.getAllUsers);
userRouter.get('/get-user/:userId', authMiddleware_1.authenticate, authMiddleware_1.isAdmin, userController_1.getUserById);
userRouter.get('/profile/get-my-profile', authMiddleware_1.authenticate, userController_1.getMyProfile);
userRouter.patch('/profile/update-my-profile', authMiddleware_1.authenticate, userController_1.updateMyProfile);
userRouter.patch('/profile/update-my-password', authMiddleware_1.authenticate, userController_1.updateMyPassword);
userRouter.delete('/profile/delete-me', authMiddleware_1.authenticate, userController_1.deleteMe);
userRouter.patch('/update-user/:userId', authMiddleware_1.authenticate, authMiddleware_1.isAdmin, userController_1.updateUser);
userRouter.patch('/update-user-role/:userId', authMiddleware_1.authenticate, authMiddleware_1.isAdmin, userController_1.updateUserRole);
userRouter.delete('/delete-user/:userId', authMiddleware_1.authenticate, authMiddleware_1.isAdmin, userController_1.deleteUser);
exports.default = userRouter;
