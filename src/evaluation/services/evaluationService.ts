import EvaluationRepository from '../repositories/evaluationRepository';
import UserRepository from '../../user/repositories/userRepository';
import BadRequest from '../../errors/BadRequest';
import { 
    USER_NOT_FOUND,
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

    async createEvaluation(evaluateeId: number, data: any, evaluatorId: number) {
        const user = await this.userRepository.getUserById(evaluateeId);

        if(!user) {
            throw new BadRequest(USER_NOT_FOUND);
        }

        const evaluation = await this.evaluationRepository.createEvaluation(evaluateeId, data, evaluatorId);

        return { 
            success: true, 
            data: evaluation,
        }
    }

}

export default EvaluationService;
