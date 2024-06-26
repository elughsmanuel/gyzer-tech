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
    req: Request & {userId?: string, role?: string}, 
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
            String(req.role),
        );

        return res.status(StatusCodes.CREATED).json(createEvaluation);
    } catch (error) {
        next(error);
    }
};

export const getAllEvaluations = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { 
            page,
            perPage,
            evaluateeId, 
            evaluatorId, 
            month,
            year,
            minWorkQualityScore,
            maxWorkQualityScore,
            minTaskCompletionScore,
            maxTaskCompletionScore,
            minAboveAndBeyondScore,
            maxAboveAndBeyondScore,
            minCommunication,
            maxCommunication,
            sortBy,
            sortOrder,
            fields,
        } = req.query;

        const evaluations = await evaluationService.getAllEvaluations(
            parseFloat(page as string) || '1',
            parseFloat(perPage as string || '10'),
            evaluateeId as string,
            evaluatorId as string,
            month as string,
            year as string,
            parseFloat(minWorkQualityScore as string) || undefined,
            parseFloat(maxWorkQualityScore as string) || undefined,
            parseFloat(minTaskCompletionScore as string) || undefined,
            parseFloat(maxTaskCompletionScore as string) || undefined,
            parseFloat(minAboveAndBeyondScore as string) || undefined,
            parseFloat(maxAboveAndBeyondScore as string) || undefined,
            parseFloat(minCommunication as string) || undefined,
            parseFloat(maxCommunication as string) || undefined,
            sortBy as string,
            sortOrder as string,
            fields ? (fields as string).split(',') : undefined,
        );

        return res.status(StatusCodes.OK).json(evaluations);
    } catch (error) {
        next(error);
    }
};

export const getEvaluationById = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;

        const evaluation = await evaluationService.getEvaluationById(
            Number(id),
        );

        return res.status(StatusCodes.OK).json(evaluation);
    } catch (error) {
        next(error);
    }
};

export const getMyEvaluations = async (
    req: Request & {userId?: string},
    res: Response,
    next: NextFunction,
) => {
    try {
        const { 
            page,
            perPage,
            type,
        } = req.query;

        const evaluations = await evaluationService.getMyEvaluations(
            Number(req.userId),
            parseFloat(page as string) || '1',
            parseFloat(perPage as string || '10'),
            type as string,
        );

        return res.status(StatusCodes.OK).json(evaluations);
    } catch (error) {
        next(error);
    }
};

export const getMyEvaluationById = async (
    req: Request & {userId?: string}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;

        const evaluation = await evaluationService.getMyEvaluationById(
            Number(req.userId),
            Number(id),
        );

        return res.status(StatusCodes.OK).json(evaluation);
    } catch (error) {
        next(error);
    }
};
