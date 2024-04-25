"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const joi_1 = __importDefault(require("joi"));
const BadRequest_1 = __importDefault(require("../errors/BadRequest"));
const Forbidden_1 = __importDefault(require("../errors/Forbidden"));
const Unauthenticated_1 = __importDefault(require("../errors/Unauthenticated"));
const UnprocessableEntity_1 = __importDefault(require("../errors/UnprocessableEntity"));
// import { logger } from '../log/logger';
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof BadRequest_1.default) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }
    if (err instanceof Forbidden_1.default) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }
    if (err instanceof Unauthenticated_1.default) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }
    if (err instanceof UnprocessableEntity_1.default) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }
    // Handle input/Joi validation errors
    if (err instanceof joi_1.default.ValidationError) {
        return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            success: false,
            data: err.details[0].message,
        });
    }
    // Handle errors in development by logging the stack
    if (process.env.NODE_ENV === 'development') {
        console.log(err.message);
        console.log(err.stack);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: err.message,
            stack: err.stack,
        });
    }
    // Handle errors in production by sending a generic error message
    else {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong.',
        });
    }
};
exports.errorMiddleware = errorMiddleware;
