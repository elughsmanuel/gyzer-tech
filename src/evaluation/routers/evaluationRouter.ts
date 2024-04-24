import express from 'express';
import { 
    authenticate, 
    isAdmin,
} from '../../middleware/authMiddleware';
import { 
    createEvaluation,
    getAllEvaluations,
} from '../controllers/evaluationController';

const evaluationRouter = express.Router();

evaluationRouter.post('/create/:evaluateeId', authenticate, createEvaluation);
evaluationRouter.get('/', authenticate, isAdmin, getAllEvaluations);

export default evaluationRouter;
