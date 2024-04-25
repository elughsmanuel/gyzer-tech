"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class Forbidden extends Error {
    constructor(message) {
        super(message);
        this.name = 'Forbidden';
        this.statusCode = http_status_codes_1.StatusCodes.FORBIDDEN;
    }
}
exports.default = Forbidden;
