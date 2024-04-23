import express from 'express';
import { 
    authenticate, 
} from '../../middleware/authMiddleware';
import { 
    createEvaluation,
} from '../controllers/evaluationController';

const evaluationRouter = express.Router();

evaluationRouter.post('/create/:evaluateeId', authenticate, createEvaluation);

export default evaluationRouter;
