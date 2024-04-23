import Joi from "joi";

export const createEvaluationSchema = Joi.object({
    workQuality: Joi.number().integer().min(0).max(5).required().messages({
        "any.required": 'WORK QUALITY REQUIRED',
        "string.empty": 'EMPTY WORK QUALITY',
        "number.base": "WORK QUALITY NUMBER",
        "number.integer": 'WORK QUALITY INTEGER',
        "number.min": 'WORK QUALITY MIN 0',
        "number.max": 'WORK QUALITY MAX 5',
    }),
    workQualityNote: Joi.string().trim().required().messages({
        "any.required": 'WORK QUALITY NOTE REQUIRED',
        "string.empty": 'EMPTY WORK QUALITY NOTE',
    }),
    taskCompletion: Joi.number().integer().min(0).max(5).required().messages({
        "any.required": 'TASK COMPLETION REQUIRED',
        "string.empty": 'EMPTY TASK COMPLETION',
        "number.base": "TASK COMPLETION NUMBER",
        "number.integer": 'TASK COMPLETION INTEGER',
        "number.min": 'TASK COMPLETION MIN 0',
        "number.max": 'TASK COMPLETION MAX 5',
    }),
    taskCompletionNote: Joi.string().trim().required().messages({
        "any.required": 'TASK COMPLETION NOTE REQUIRED',
        "string.empty": 'EMPTY TASK COMPLETION NOTE',
    }),
    aboveAndBeyond: Joi.number().integer().min(0).max(5).required().messages({
        "any.required": 'ABOVE AND BEYOND REQUIRED',
        "string.empty": 'EMPTY ABOVE AND BEYOND',
        "number.base": "ABOVE AND BEYOND NUMBER",
        "number.integer": 'ABOVE AND BEYOND INTEGER',
        "number.min": 'ABOVE AND BEYOND MIN 0',
        "number.max": 'ABOVE AND BEYOND MAX 5',
    }),
    aboveAndBeyondNote: Joi.string().trim().required().messages({
        "any.required": 'ABOVE AND BEYOND NOTE REQUIRED',
        "string.empty": 'EMPTY ABOVE AND BEYOND NOTE',
    }),
    communication: Joi.number().integer().min(0).max(5).required().messages({
        "any.required": 'COMMUNICATION REQUIRED',
        "string.empty": 'EMPTY COMMUNICATION',
        "number.base": "COMMUNICATION NUMBER",
        "number.integer": 'COMMUNICATION INTEGER',
        "number.min": 'COMMUNICATION MIN 0',
        "number.max": 'COMMUNICATION MAX 5',
    }),
    communicationNote: Joi.string().trim().required().messages({
        "any.required": 'COMMUNICATION NOTE REQUIRED',
        "string.empty": 'EMPTY COMMUNICATION NOTE',
    }),
});
