"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvaluationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createEvaluationSchema = joi_1.default.object({
    workQualityScore: joi_1.default.number().integer().min(0).max(5).required().messages({
        "any.required": 'WORK QUALITY SCORE REQUIRED',
        "string.empty": 'EMPTY WORK QUALITY SCORE',
        "number.base": "WORK QUALITY SCORE NUMBER",
        "number.integer": 'WORK QUALITY SCORE INTEGER',
        "number.min": 'WORK QUALITY SCORE MIN 0',
        "number.max": 'WORK QUALITY SCORE MAX 5',
    }),
    workQualityComment: joi_1.default.string().trim().required().messages({
        "any.required": 'WORK QUALITY COMMENT REQUIRED',
        "string.empty": 'EMPTY WORK QUALITY COMMENT',
    }),
    taskCompletionScore: joi_1.default.number().integer().min(0).max(5).required().messages({
        "any.required": 'TASK COMPLETION SCORE REQUIRED',
        "string.empty": 'EMPTY TASK COMPLETION SCORE',
        "number.base": "TASK COMPLETION SCORE NUMBER",
        "number.integer": 'TASK COMPLETION SCORE INTEGER',
        "number.min": 'TASK COMPLETION SCORE MIN 0',
        "number.max": 'TASK COMPLETION SCORE MAX 5',
    }),
    taskCompletionComment: joi_1.default.string().trim().required().messages({
        "any.required": 'TASK COMPLETION COMMENT REQUIRED',
        "string.empty": 'EMPTY TASK COMPLETION COMMENT',
    }),
    aboveAndBeyondScore: joi_1.default.number().integer().min(0).max(5).required().messages({
        "any.required": 'ABOVE AND BEYOND SCORE REQUIRED',
        "string.empty": 'EMPTY ABOVE AND BEYOND SCORE',
        "number.base": "ABOVE AND BEYOND SCORE NUMBER",
        "number.integer": 'ABOVE AND BEYOND SCORE INTEGER',
        "number.min": 'ABOVE AND BEYOND SCORE MIN 0',
        "number.max": 'ABOVE AND BEYOND SCORE MAX 5',
    }),
    aboveAndBeyondComment: joi_1.default.string().trim().required().messages({
        "any.required": 'ABOVE AND BEYOND COMMENT REQUIRED',
        "string.empty": 'EMPTY ABOVE AND BEYOND COMMENT',
    }),
    communicationScore: joi_1.default.number().integer().min(0).max(5).required().messages({
        "any.required": 'COMMUNICATION SCORE REQUIRED',
        "string.empty": 'EMPTY COMMUNICATION SCORE',
        "number.base": "COMMUNICATION SCORE NUMBER",
        "number.integer": 'COMMUNICATION SCORE INTEGER',
        "number.min": 'COMMUNICATION SCORE MIN 0',
        "number.max": 'COMMUNICATION SCORE MAX 5',
    }),
    communicationComment: joi_1.default.string().trim().required().messages({
        "any.required": 'COMMUNICATION COMMENT REQUIRED',
        "string.empty": 'EMPTY COMMUNICATION COMMENT',
    }),
    month: joi_1.default.string().valid('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December').trim().required().messages({
        "any.required": 'MONTH REQUIRED',
        "string.empty": 'EMPTY MONTH',
    }),
    year: joi_1.default.string().min(4).max(4).pattern(/^\d+$/).required().messages({
        "any.required": 'YEAR REQUIRED',
        "string.empty": 'EMPTY YEAR',
        "string.min": 'YEAR EXACTLY 4 DIGITS',
        "string.max": 'YEAR EXACTLY 4 DIGITS',
        "string.pattern.base": "YEAR ONLY 0 - 9"
    }),
});
