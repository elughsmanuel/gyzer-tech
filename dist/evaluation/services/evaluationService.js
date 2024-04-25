"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BadRequest_1 = __importDefault(require("../../errors/BadRequest"));
const Forbidden_1 = __importDefault(require("../../errors/Forbidden"));
const constants_1 = require("../utils/constants");
const evaluationQuery_1 = require("../utils/evaluationQuery");
class EvaluationService {
    constructor(evaluationRepository, userRepository) {
        this.evaluationRepository = evaluationRepository;
        this.userRepository = userRepository;
    }
    createEvaluation(evaluateeId, data, evaluatorId, evaluatorRole) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserById(evaluateeId);
            if (!user) {
                throw new BadRequest_1.default(constants_1.EVALUATEE_NOT_FOUND);
            }
            const role = evaluatorRole;
            if (evaluateeId === evaluatorId) {
                throw new Forbidden_1.default(constants_1.SELF_EVALUATION_PERMISSION);
            }
            if (role === "manager") {
                const evaluator = yield this.userRepository.findManagerById(evaluatorId);
                if (!evaluator) {
                    throw new Forbidden_1.default(constants_1.EVALUATOR_PERMISSION);
                }
            }
            const evaluation = yield this.evaluationRepository.createEvaluation(evaluateeId, data, evaluatorId);
            return {
                success: true,
                data: evaluation,
            };
        });
    }
    getAllEvaluations(page, perPage, evaluateeId, evaluatorId, month, year, minWorkQualityScore, maxWorkQualityScore, minTaskCompletionScore, maxTaskCompletionScore, minAboveAndBeyondScore, maxAboveAndBeyondScore, minCommunication, maxCommunication, sortBy, sortOrder, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            // Build the query for filtering evaluation
            const query = evaluationQuery_1.evaluationQuery.buildEvaluationQuery(evaluateeId, evaluatorId, month, year, minWorkQualityScore, maxWorkQualityScore, minTaskCompletionScore, maxTaskCompletionScore, minAboveAndBeyondScore, maxAboveAndBeyondScore, minCommunication, maxCommunication);
            // Build options for sorting products
            const sortOptions = evaluationQuery_1.evaluationQuery.buildSortOptions(sortBy, sortOrder);
            const selectFields = fields ? fields : undefined;
            const count = yield this.evaluationRepository.getTotalEvaluationCount(query);
            // Calculate pagination values
            const skip = (page - 1) * perPage;
            const currentPage = Math.ceil(page);
            const totalPages = Math.ceil(count / perPage);
            const evaluations = yield this.evaluationRepository.getAllEvaluations(query, sortOptions, skip, perPage, selectFields);
            return {
                status: true,
                results: evaluations.length,
                data: evaluations,
                currentPage: currentPage,
                totalPages: totalPages,
            };
        });
    }
    getEvaluationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const evaluation = yield this.evaluationRepository.getEvaluationById(id);
            return {
                status: true,
                data: evaluation,
            };
        });
    }
    getMyEvaluations(userId, page, perPage, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.evaluationRepository.getMyTotalEvaluationCount();
            // Calculate pagination values
            const skip = (page - 1) * perPage;
            const currentPage = Math.ceil(page);
            const totalPages = Math.ceil(count / perPage);
            if (type === "sent") {
                const evaluations = yield this.evaluationRepository.getMyEvaluationsSent(userId, skip, perPage);
                return {
                    status: true,
                    results: evaluations.length,
                    data: evaluations,
                    currentPage: currentPage,
                    totalPages: totalPages,
                };
            }
            if (type === "received") {
                const evaluations = yield this.evaluationRepository.getMyEvaluationsReceived(userId, skip, perPage);
                return {
                    status: true,
                    results: evaluations.length,
                    data: evaluations,
                    currentPage: currentPage,
                    totalPages: totalPages,
                };
            }
            const evaluations = yield this.evaluationRepository.getMyEvaluations(userId, skip, perPage);
            return {
                status: true,
                results: evaluations.length,
                data: evaluations,
                currentPage: currentPage,
                totalPages: totalPages,
            };
        });
    }
    getMyEvaluationById(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const evaluation = yield this.evaluationRepository.getMyEvaluationById(userId, id);
            return {
                status: true,
                data: evaluation,
            };
        });
    }
}
exports.default = EvaluationService;
