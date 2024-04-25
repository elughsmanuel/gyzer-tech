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
const sequelize_1 = require("sequelize");
const evaluation_1 = __importDefault(require("../../models/evaluation"));
class EvaluationRepository {
    createEvaluation(evaluateeId, data, evaluatorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const evaluation = yield evaluation_1.default.create(Object.assign(Object.assign({ evaluateeId }, data), { evaluatorId }));
            return evaluation;
        });
    }
    getAllEvaluations(query, sortOptions, skip, perPage, selectFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                where: query,
                order: sortOptions,
                offset: skip,
                limit: perPage,
                attributes: selectFields && selectFields.length > 0 ? selectFields : undefined
            };
            if (Array.isArray(sortOptions) && sortOptions.length > 0) {
                options.order = sortOptions;
            }
            else {
                options.order = [['createdAt', 'ASC']];
            }
            const evaluations = yield evaluation_1.default.findAll(options);
            return evaluations;
        });
    }
    getTotalEvaluationCount(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield evaluation_1.default.count({ where: query });
            return count;
        });
    }
    getEvaluationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const evaluation = yield evaluation_1.default.findByPk(id);
            return evaluation;
        });
    }
    getMyEvaluations(userId, skip, perPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                where: {
                    [sequelize_1.Op.or]: [
                        { evaluateeId: userId },
                        { evaluatorId: userId },
                    ],
                },
                offset: skip,
                limit: perPage,
            };
            const evaluations = yield evaluation_1.default.findAll(options);
            return evaluations;
        });
    }
    getMyEvaluationsSent(userId, skip, perPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                where: {
                    evaluatorId: userId,
                },
                offset: skip,
                limit: perPage,
            };
            const evaluations = yield evaluation_1.default.findAll(options);
            return evaluations;
        });
    }
    getMyEvaluationsReceived(userId, skip, perPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                where: {
                    evaluateeId: userId,
                },
                offset: skip,
                limit: perPage,
            };
            const evaluations = yield evaluation_1.default.findAll(options);
            return evaluations;
        });
    }
    getMyTotalEvaluationCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield evaluation_1.default.count();
            return count;
        });
    }
    getMyEvaluationById(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const evaluation = yield evaluation_1.default.findOne({
                where: {
                    [sequelize_1.Op.or]: [
                        { evaluateeId: userId },
                        { evaluatorId: userId },
                    ],
                    id: id
                }
            });
            return evaluation;
        });
    }
}
exports.default = EvaluationRepository;
