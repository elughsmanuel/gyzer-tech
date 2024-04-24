import Joi from "joi";

export const createEvaluationSchema = Joi.object({
    workQualityScore: Joi.number().integer().min(0).max(5).required().messages({
        "any.required": 'WORK QUALITY SCORE REQUIRED',
        "string.empty": 'EMPTY WORK QUALITY SCORE',
        "number.base": "WORK QUALITY SCORE NUMBER",
        "number.integer": 'WORK QUALITY SCORE INTEGER',
        "number.min": 'WORK QUALITY SCORE MIN 0',
        "number.max": 'WORK QUALITY SCORE MAX 5',
    }),
    workQualityComment: Joi.string().trim().required().messages({
        "any.required": 'WORK QUALITY COMMENT REQUIRED',
        "string.empty": 'EMPTY WORK QUALITY COMMENT',
    }),
    taskCompletionScore: Joi.number().integer().min(0).max(5).required().messages({
        "any.required": 'TASK COMPLETION SCORE REQUIRED',
        "string.empty": 'EMPTY TASK COMPLETION SCORE',
        "number.base": "TASK COMPLETION SCORE NUMBER",
        "number.integer": 'TASK COMPLETION SCORE INTEGER',
        "number.min": 'TASK COMPLETION SCORE MIN 0',
        "number.max": 'TASK COMPLETION SCORE MAX 5',
    }),
    taskCompletionComment: Joi.string().trim().required().messages({
        "any.required": 'TASK COMPLETION COMMENT REQUIRED',
        "string.empty": 'EMPTY TASK COMPLETION COMMENT',
    }),
    aboveAndBeyondScore: Joi.number().integer().min(0).max(5).required().messages({
        "any.required": 'ABOVE AND BEYOND SCORE REQUIRED',
        "string.empty": 'EMPTY ABOVE AND BEYOND SCORE',
        "number.base": "ABOVE AND BEYOND SCORE NUMBER",
        "number.integer": 'ABOVE AND BEYOND SCORE INTEGER',
        "number.min": 'ABOVE AND BEYOND SCORE MIN 0',
        "number.max": 'ABOVE AND BEYOND SCORE MAX 5',
    }),
    aboveAndBeyondComment: Joi.string().trim().required().messages({
        "any.required": 'ABOVE AND BEYOND COMMENT REQUIRED',
        "string.empty": 'EMPTY ABOVE AND BEYOND COMMENT',
    }),
    communicationScore: Joi.number().integer().min(0).max(5).required().messages({
        "any.required": 'COMMUNICATION SCORE REQUIRED',
        "string.empty": 'EMPTY COMMUNICATION SCORE',
        "number.base": "COMMUNICATION SCORE NUMBER",
        "number.integer": 'COMMUNICATION SCORE INTEGER',
        "number.min": 'COMMUNICATION SCORE MIN 0',
        "number.max": 'COMMUNICATION SCORE MAX 5',
    }),
    communicationComment: Joi.string().trim().required().messages({
        "any.required": 'COMMUNICATION COMMENT REQUIRED',
        "string.empty": 'EMPTY COMMUNICATION COMMENT',
    }),
    month: Joi.string().trim().required().messages({
        "any.required": 'MONTH REQUIRED',
        "string.empty": 'EMPTY MONTH',
    }),
    year: Joi.number().integer().required().messages({
        "any.required": 'YEAR REQUIRED',
        "string.empty": 'EMPTY YEAR',
        "number.base": "YEAR NUMBER",
        "number.integer": 'YEAR INTEGER',
    }),
});
