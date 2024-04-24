import EvaluationRepository from '../repositories/evaluationRepository';
import UserRepository from '../../user/repositories/userRepository';
import BadRequest from '../../errors/BadRequest';
import Forbidden from '../../errors/Forbidden';
import { 
    EVALUATEE_NOT_FOUND,
    EVALUATOR_PERMISSION,
} from '../utils/constants';
import { evaluationQuery } from '../utils/evaluationQuery';

class EvaluationService {
    private evaluationRepository: EvaluationRepository;
    private userRepository: UserRepository;

    constructor(
        evaluationRepository:EvaluationRepository,
        userRepository: UserRepository,
    ) {
        this.evaluationRepository = evaluationRepository;
        this.userRepository = userRepository;
    }

    async createEvaluation(evaluateeId: number, data: any, evaluatorId: number, evaluatorRole: string) {
        const user = await this.userRepository.getUserById(evaluateeId);

        if(!user) {
            throw new BadRequest(EVALUATEE_NOT_FOUND);
        }

        const role = evaluatorRole;

        if(role === "manager") {
            const evaluator = await this.userRepository.findManagerById(evaluatorId);

            if(!evaluator) {
                throw new Forbidden(EVALUATOR_PERMISSION);
            }
        }

        const evaluation = await this.evaluationRepository.createEvaluation(evaluateeId, data, evaluatorId);

        return { 
            success: true, 
            data: evaluation,
        }
    }

    async getAllEvaluations(
        page: any,
        perPage: any,
        evaluateeId?: string,
        evaluatorId?: string,
        month?: string,
        year?: string,
        minWorkQualityScore?: number,
        maxWorkQualityScore?: number,
        minTaskCompletionScore?: number,
        maxTaskCompletionScore?: number,
        minAboveAndBeyondScore?: number,
        maxAboveAndBeyondScore?: number,
        minCommunication?: number,
        maxCommunication?: number,
        sortBy?: string,
        sortOrder?: string,
        fields?: string[],
    ) {
        // Build the query for filtering evaluation
        const query = evaluationQuery.buildEvaluationQuery(
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
        );

        // Build options for sorting products
        const sortOptions = evaluationQuery.buildSortOptions(
            sortBy,
            sortOrder,
        );

        const selectFields = fields ? fields : undefined;

        const count = await this.evaluationRepository.getTotalEvaluationCount(query);

        // Calculate pagination values
        const skip = (page - 1) * perPage;
        const currentPage = Math.ceil(page);
        const totalPages = Math.ceil(count / perPage);
        
        const evaluations = await this.evaluationRepository.getAllEvaluations(query, sortOptions, skip, perPage, selectFields);

        return {
            status: true,
            results: evaluations.length,
            data: evaluations,
            currentPage: currentPage,
            totalPages: totalPages,
        }
    }

    async getEvaluationById(id: number) {
        const evaluation = await this.evaluationRepository.getEvaluationById(id);

        return {
            status: true,
            data: evaluation,
        }
    }

    async getMyEvaluations(
        userId: number,
        page: any,
        perPage: any,
        type?: string,
    ) {
        const count = await this.evaluationRepository.getMyTotalEvaluationCount();

        // Calculate pagination values
        const skip = (page - 1) * perPage;
        const currentPage = Math.ceil(page);
        const totalPages = Math.ceil(count / perPage);

        let evaluations;

        if(type === "sent") {
            evaluations = await this.evaluationRepository.getMyEvaluationsSent(userId, skip, perPage);
        }

        if(type === "received") {
            evaluations = await this.evaluationRepository.getMyEvaluationsReceived(userId, skip, perPage);
        }
        
        evaluations = await this.evaluationRepository.getMyEvaluations(userId, skip, perPage);

        return {
            status: true,
            results: evaluations.length,
            data: evaluations,
            currentPage: currentPage,
            totalPages: totalPages,
        }
    }

    async getMyEvaluationById(userId: number, id: number) {
        const evaluation = await this.evaluationRepository.getMyEvaluationById(userId, id);

        return {
            status: true,
            data: evaluation,
        }
    }
}

export default EvaluationService;
