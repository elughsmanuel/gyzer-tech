"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluationQuery = void 0;
class evaluationQuery {
    static buildEvaluationQuery(evaluateeId, evaluatorId, month, year, minWorkQualityScore, maxWorkQualityScore, minTaskCompletionScore, maxTaskCompletionScore, minAboveAndBeyondScore, maxAboveAndBeyondScore, minCommunication, maxCommunication, search) {
        const query = {};
        if (evaluateeId) {
            query.evaluateeId = evaluateeId;
        }
        if (evaluatorId) {
            query.evaluatorId = evaluatorId;
        }
        if (month) {
            query.month = month;
        }
        if (year) {
            query.year = year;
        }
        if (minWorkQualityScore !== undefined) {
            query.workQualityScore = query.workQualityScore || {};
            query.workQualityScore.$gte = minWorkQualityScore;
        }
        if (maxWorkQualityScore !== undefined) {
            query.workQualityScore = query.workQualityScore || {};
            query.workQualityScore.$lte = maxWorkQualityScore;
        }
        if (minTaskCompletionScore !== undefined) {
            query.taskCompletionScore = query.taskCompletionScore || {};
            query.taskCompletionScore.$gte = minTaskCompletionScore;
        }
        if (maxTaskCompletionScore !== undefined) {
            query.taskCompletionScore = query.taskCompletionScore || {};
            query.taskCompletionScore.$lte = maxTaskCompletionScore;
        }
        if (minAboveAndBeyondScore !== undefined) {
            query.aboveAndBeyondScore = query.aboveAndBeyondScore || {};
            query.aboveAndBeyondScore.$gte = minAboveAndBeyondScore;
        }
        if (maxAboveAndBeyondScore !== undefined) {
            query.aboveAndBeyondScore = query.aboveAndBeyondScore || {};
            query.aboveAndBeyondScore.$lte = maxAboveAndBeyondScore;
        }
        if (minCommunication !== undefined) {
            query.communication = query.communication || {};
            query.communication.$gte = minCommunication;
        }
        if (maxCommunication !== undefined) {
            query.communication = query.communication || {};
            query.communication.$lte = maxCommunication;
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }
        return query;
    }
    static buildSortOptions(sortBy, sortOrder) {
        const sortOptions = {};
        if (sortBy) {
            const validSortFields = ['workQualityScore', 'taskCompletionScore', 'aboveAndBeyondScore', 'communication'];
            if (validSortFields.includes(sortBy)) {
                sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
            }
        }
        return sortOptions;
    }
}
exports.evaluationQuery = evaluationQuery;
