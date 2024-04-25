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
exports.followUpReminderCron = exports.monthlyReminderCron = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const mailer_1 = __importDefault(require("../utils/mailer"));
const monthlyReminderCron = (userRepository) => {
    node_cron_1.default.schedule('0 0 1 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userRepository.getAllUsersForReminder();
        const usersData = users.map(user => user.get({ plain: true }));
        usersData.forEach((cur) => __awaiter(void 0, void 0, void 0, function* () {
            const evaluationUrl = `http://localhost:8000/evaluation`;
            yield new mailer_1.default(cur, evaluationUrl).sendMonthlyReminder();
        }));
    }));
};
exports.monthlyReminderCron = monthlyReminderCron;
const followUpReminderCron = (userRepository) => {
    node_cron_1.default.schedule('0 0 4-31 * *', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userRepository.getAllUsersForReminder();
        const usersData = users.map(user => user.get({ plain: true }));
        usersData.forEach((cur) => __awaiter(void 0, void 0, void 0, function* () {
            const evaluationUrl = `http://localhost:8000/evaluation`;
            yield new mailer_1.default(cur, evaluationUrl).sendFollowUpReminder();
        }));
    }));
};
exports.followUpReminderCron = followUpReminderCron;
