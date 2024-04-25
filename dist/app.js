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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const http_status_codes_1 = require("http-status-codes");
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const models_1 = __importDefault(require("./models"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const logger_1 = require("./log/logger");
const authRouter_1 = __importDefault(require("./auth/routers/authRouter"));
const userRouter_1 = __importDefault(require("./user/routers/userRouter"));
const evaluationRouter_1 = __importDefault(require("./evaluation/routers/evaluationRouter"));
const constants_1 = require("./utils/constants");
const cron_1 = require("./cron");
const userRepository_1 = __importDefault(require("./user/repositories/userRepository"));
const app = (0, express_1.default)();
const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT || 8000);
const httpServer = http_1.default.createServer(app);
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: constants_1.RATE_LIMIT,
});
app.use('/api', limiter);
const userRepository = new userRepository_1.default();
(0, cron_1.monthlyReminderCron)(userRepository);
(0, cron_1.followUpReminderCron)(userRepository);
app.get('/', (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        data: `${http_status_codes_1.ReasonPhrases.OK} : Homepage`,
    });
});
app.get('/api', (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        data: `${http_status_codes_1.ReasonPhrases.OK} : API`,
    });
});
app.get('/api/v1', (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        data: `${http_status_codes_1.ReasonPhrases.OK} : API - v1`,
    });
});
app.use('/api/v1/auth', authRouter_1.default);
app.use('/api/v1/users', userRouter_1.default);
app.use('/api/v1/evaluations', evaluationRouter_1.default);
app.all('*', (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        data: `Can't find ${req.originalUrl} on this server.`,
    });
});
app.use(errorMiddleware_1.errorMiddleware);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (models_1.default === null || models_1.default === void 0 ? void 0 : models_1.default.authenticate());
        logger_1.logger.info(`[DATABASE] - Database connection has been successfully established.`);
        try {
            httpServer.listen(port, host, () => {
                logger_1.logger.info(`🌟 🛠️  [SERVER] - Server is listening on http://${host}:${port}`);
            });
        }
        catch (error) {
            logger_1.logger.fatal(`[SERVER] - Failed to start. Encountered an error during startup.`, error);
        }
    }
    catch (error) {
        logger_1.logger.fatal(`[DATABASE] - Server not started due to database connection error.`, error);
    }
});
startServer();
exports.default = app;
