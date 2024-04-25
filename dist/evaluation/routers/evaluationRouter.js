"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middleware/authMiddleware");
const evaluationController_1 = require("../controllers/evaluationController");
const evaluationRouter = express_1.default.Router();
evaluationRouter.post('/create/:evaluateeId', authMiddleware_1.authenticate, evaluationController_1.createEvaluation);
evaluationRouter.get('/get-all-evaluations', authMiddleware_1.authenticate, authMiddleware_1.isAdmin, evaluationController_1.getAllEvaluations);
evaluationRouter.get('/get-evaluation/:id', authMiddleware_1.authenticate, authMiddleware_1.isAdmin, evaluationController_1.getEvaluationById);
evaluationRouter.get('/get-my-evaluations', authMiddleware_1.authenticate, evaluationController_1.getMyEvaluations);
evaluationRouter.get('/get-my-evaluation/:id', authMiddleware_1.authenticate, evaluationController_1.getMyEvaluationById);
exports.default = evaluationRouter;
