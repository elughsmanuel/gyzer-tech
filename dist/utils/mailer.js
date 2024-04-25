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
const nodemailer_1 = __importDefault(require("nodemailer"));
const pug_1 = __importDefault(require("pug"));
const html_to_text_1 = require("html-to-text");
const constants_1 = require("./constants");
class EmailService {
    constructor(user, url) {
        this.from = `${process.env.ADMIN_FIRST_NAME} ${process.env.ADMIN_LAST_NAME} <${process.env.ADMIN_EMAIL}>`;
        this.to = user.email;
        this.firstName = user.firstName;
        this.url = url;
    }
    newTransport() {
        return nodemailer_1.default.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }
    // Send the actual email
    send(template, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. Render HTML based on a pug template
            const html = pug_1.default.renderFile(`${__dirname}/../../views/${template}.pug`, {
                firstName: this.firstName,
                url: this.url,
                subject,
            });
            // 2. Define email options
            const mailOptions = {
                from: this.from,
                to: this.to,
                subject,
                html,
                text: (0, html_to_text_1.convert)(html),
            };
            // 3. Create a transport and send email
            yield this.newTransport().sendMail(mailOptions);
        });
    }
    sendWelcome() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send('welcome', constants_1.SEND_WELCOME);
        });
    }
    sendResetPasswordEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send('passwordReset', constants_1.SEND_RESET_PASSWORD);
        });
    }
    sendMonthlyReminder() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send('monthlyReminder', constants_1.SEND_MONTHLY_REMINDER);
        });
    }
    sendFollowUpReminder() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send('followUpReminder', constants_1.SEND_FOLLOW_UP_REMINDER);
        });
    }
}
;
exports.default = EmailService;
