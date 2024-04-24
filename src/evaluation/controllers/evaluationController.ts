import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { 
    createEvaluationSchema, 
} from '../validators/schema';
import EvaluationService from '../services/evaluationService';
import EvaluationRepository from '../repositories/evaluationRepository';
import UserRepository from '../../user/repositories/userRepository';

const evaluationRepository = new EvaluationRepository();
const userRepository = new UserRepository();
const evaluationService = new EvaluationService(evaluationRepository, userRepository);

export const createEvaluation = async (
    req: Request & {userId?: string}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { evaluateeId } = req.params;
        const schema = await createEvaluationSchema.validateAsync(req.body);

        const createEvaluation = await evaluationService.createEvaluation(
            Number(evaluateeId),
            schema,
            Number(req.userId),
        );

        return res.status(StatusCodes.CREATED).json(createEvaluation);
    } catch (error) {
        next(error);
    }
};
