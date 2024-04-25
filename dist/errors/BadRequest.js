"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class BadRequest extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequest';
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
}
exports.default = BadRequest;
