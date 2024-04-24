import { Op } from "sequelize";
import Evaluation from "../../models/evaluation";

class EvaluationRepository {
    async createEvaluation(evaluateeId: number, data: any, evaluatorId: number) {
        const evaluation = await Evaluation.create({
            evaluateeId,
            ...data,
            evaluatorId,
        });

        return evaluation;
    }

    async getAllEvaluations(query: any, sortOptions: any, skip: any, perPage: any, selectFields?: string[]) {
        const options = {
            where: query,
            order: sortOptions,
            offset: skip,
            limit: perPage,
            attributes: selectFields && selectFields.length > 0 ? selectFields : undefined
        };

        if (Array.isArray(sortOptions) && sortOptions.length > 0) {
            options.order = sortOptions;
        } else {
            options.order = [['createdAt', 'ASC']];
        }

        const evaluations = await Evaluation.findAll(options);

        return evaluations;
    }

    async getTotalEvaluationCount(query: any) {
        const count = await Evaluation.count({ where: query });
        
        return count;
    }

    async getEvaluationById(id: number) {
        const evaluation = await Evaluation.findByPk(id);
      
        return evaluation;
    }

    async getMyEvaluations(userId: number, skip: any, perPage: any) {
        const options = {
            where: {
                [Op.or]: [
                    { evaluateeId: userId },
                    { evaluatorId: userId },
                ],
            },
    
            offset: skip,
            limit: perPage,
        };

        const evaluations = await Evaluation.findAll(options);

        return evaluations;
    }

    async getMyEvaluationsSent(userId: number, skip: any, perPage: any) {
        const options = {
            where: {
                evaluatorId: userId,
            },
    
            offset: skip,
            limit: perPage,
        };

        const evaluations = await Evaluation.findAll(options);

        return evaluations;
    }

    async getMyEvaluationsReceived(userId: number, skip: any, perPage: any) {
        const options = {
            where: {
                evaluateeId: userId,
            },
    
            offset: skip,
            limit: perPage,
        };

        const evaluations = await Evaluation.findAll(options);

        return evaluations;
    }

    async getMyTotalEvaluationCount() {
        const count = await Evaluation.count();
        
        return count;
    }

    async getMyEvaluationById(userId: number, id: number) {
        const evaluation = await Evaluation.findOne({
            where: {
                [Op.or]: [
                    { evaluateeId: userId },
                    { evaluatorId: userId },
                ],
                id: id
            }
        });
      
        return evaluation;
    }
}

export default EvaluationRepository;
