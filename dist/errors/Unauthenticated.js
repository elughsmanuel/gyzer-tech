"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class Unauthenticated extends Error {
    constructor(message) {
        super(message);
        this.name = 'Unauthenticated';
        this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
    }
}
exports.default = Unauthenticated;
