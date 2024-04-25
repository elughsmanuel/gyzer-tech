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
exports.getMyEvaluationById = exports.getMyEvaluations = exports.getEvaluationById = exports.getAllEvaluations = exports.createEvaluation = void 0;
const http_status_codes_1 = require("http-status-codes");
const schema_1 = require("../validators/schema");
const evaluationService_1 = __importDefault(require("../services/evaluationService"));
const evaluationRepository_1 = __importDefault(require("../repositories/evaluationRepository"));
const userRepository_1 = __importDefault(require("../../user/repositories/userRepository"));
const evaluationRepository = new evaluationRepository_1.default();
const userRepository = new userRepository_1.default();
const evaluationService = new evaluationService_1.default(evaluationRepository, userRepository);
const createEvaluation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { evaluateeId } = req.params;
        const schema = yield schema_1.createEvaluationSchema.validateAsync(req.body);
        const createEvaluation = yield evaluationService.createEvaluation(Number(evaluateeId), schema, Number(req.userId), String(req.role));
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(createEvaluation);
    }
    catch (error) {
        next(error);
    }
});
exports.createEvaluation = createEvaluation;
const getAllEvaluations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, perPage, evaluateeId, evaluatorId, month, year, minWorkQualityScore, maxWorkQualityScore, minTaskCompletionScore, maxTaskCompletionScore, minAboveAndBeyondScore, maxAboveAndBeyondScore, minCommunication, maxCommunication, sortBy, sortOrder, fields, } = req.query;
        const evaluations = yield evaluationService.getAllEvaluations(parseFloat(page) || '1', parseFloat(perPage || '10'), evaluateeId, evaluatorId, month, year, parseFloat(minWorkQualityScore) || undefined, parseFloat(maxWorkQualityScore) || undefined, parseFloat(minTaskCompletionScore) || undefined, parseFloat(maxTaskCompletionScore) || undefined, parseFloat(minAboveAndBeyondScore) || undefined, parseFloat(maxAboveAndBeyondScore) || undefined, parseFloat(minCommunication) || undefined, parseFloat(maxCommunication) || undefined, sortBy, sortOrder, fields ? fields.split(',') : undefined);
        return res.status(http_status_codes_1.StatusCodes.OK).json(evaluations);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllEvaluations = getAllEvaluations;
const getEvaluationById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const evaluation = yield evaluationService.getEvaluationById(Number(id));
        return res.status(http_status_codes_1.StatusCodes.OK).json(evaluation);
    }
    catch (error) {
        next(error);
    }
});
exports.getEvaluationById = getEvaluationById;
const getMyEvaluations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, perPage, type, } = req.query;
        const evaluations = yield evaluationService.getMyEvaluations(Number(req.userId), parseFloat(page) || '1', parseFloat(perPage || '10'), type);
        return res.status(http_status_codes_1.StatusCodes.OK).json(evaluations);
    }
    catch (error) {
        next(error);
    }
});
exports.getMyEvaluations = getMyEvaluations;
const getMyEvaluationById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const evaluation = yield evaluationService.getMyEvaluationById(Number(req.userId), Number(id));
        return res.status(http_status_codes_1.StatusCodes.OK).json(evaluation);
    }
    catch (error) {
        next(error);
    }
});
exports.getMyEvaluationById = getMyEvaluationById;
