'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {import('sequelize-cli').Migration} */
const sequelize_1 = require("sequelize");
module.exports = {
    up(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable('evaluations', {
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                evaluateeId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: "EVALUATEE ID REQUIRED",
                        },
                    },
                },
                workQualityScore: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: "WORK QUALITY SCORE REQUIRED",
                        },
                    },
                },
                workQualityComment: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: "WORK QUALITY COMMENT REQUIRED",
                        },
                    },
                },
                taskCompletionScore: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: "TASK COMPLETION SCORE REQUIRED",
                        },
                    },
                },
                taskCompletionComment: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: "TASK COMPLETION COMMENT REQUIRED",
                        },
                    },
                },
                aboveAndBeyondScore: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: "ABOVE AND BEYOND SCORE REQUIRED",
                        },
                    },
                },
                aboveAndBeyondComment: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: "ABOVE AND BEYOND COMMENT REQUIRED",
                        },
                    },
                },
                communicationScore: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: "COMMUNICATION SCORE REQUIRED",
                        },
                    },
                },
                communicationComment: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: "COMMUNICATION COMMENT REQUIRED",
                        },
                    },
                },
                evaluatorId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: "EVALUATOR ID REQUIRED",
                        },
                    },
                },
                month: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: "MONTH REQUIRED",
                        },
                    },
                },
                year: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: "YEAR REQUIRED",
                        },
                    },
                },
                createdAt: sequelize_1.DataTypes.DATE,
                updatedAt: sequelize_1.DataTypes.DATE,
            });
        });
    },
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('evaluations');
        });
    },
};
