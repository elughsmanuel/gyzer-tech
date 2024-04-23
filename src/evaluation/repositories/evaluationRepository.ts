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
}

export default EvaluationRepository;
