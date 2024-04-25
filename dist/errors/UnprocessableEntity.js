"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class UnprocessableEntity extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnprocessableEntity';
        this.statusCode = http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY;
    }
}
exports.default = UnprocessableEntity;
