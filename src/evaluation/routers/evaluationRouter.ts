import express from 'express';
import { 
    authenticate, 
    isAdmin,
} from '../../middleware/authMiddleware';
import { 
    createEvaluation,
    getAllEvaluations,
    getEvaluationById,
} from '../controllers/evaluationController';

const evaluationRouter = express.Router();

evaluationRouter.post('/create/:evaluateeId', authenticate, createEvaluation);
evaluationRouter.get('/', authenticate, isAdmin, getAllEvaluations);
evaluationRouter.get('/get-evaluation/:id', authenticate, isAdmin, getEvaluationById);

export default evaluationRouter;
