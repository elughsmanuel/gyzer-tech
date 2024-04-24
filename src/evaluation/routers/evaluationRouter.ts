import express from 'express';
import { 
    authenticate, 
    isAdmin,
} from '../../middleware/authMiddleware';
import { 
    createEvaluation,
    getAllEvaluations,
    getEvaluationById,
    getMyEvaluations,
} from '../controllers/evaluationController';

const evaluationRouter = express.Router();

evaluationRouter.post('/create/:evaluateeId', authenticate, createEvaluation);
evaluationRouter.get('/get-all-evaluations', authenticate, isAdmin, getAllEvaluations);
evaluationRouter.get('/get-evaluation/:id', authenticate, isAdmin, getEvaluationById);
evaluationRouter.get('/get-my-evaluations', authenticate, getMyEvaluations);

export default evaluationRouter;
