import EvaluationRepository from '../repositories/evaluationRepository';
import UserRepository from '../../user/repositories/userRepository';
import BadRequest from '../../errors/BadRequest';
import Forbidden from '../../errors/Forbidden';
import { 
    EVALUATEE_NOT_FOUND,
    EVALUATOR_PERMISSION,
} from '../utils/constants';

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

}

export default EvaluationService;
