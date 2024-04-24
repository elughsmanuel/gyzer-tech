'use strict';

/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    async up (queryInterface: QueryInterface) {
        await queryInterface.createTable('evaluations', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            evaluateeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "EVALUATEE ID REQUIRED",
                    },
                },
            },
            workQualityScore: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "WORK QUALITY SCORE REQUIRED",
                    },
                },
            },
            workQualityComment: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "WORK QUALITY COMMENT REQUIRED",
                    },
                },
            },
            taskCompletionScore: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "TASK COMPLETION SCORE REQUIRED",
                    },
                },
            },
            taskCompletionComment: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "TASK COMPLETION COMMENT REQUIRED",
                    },
                },
            },
            aboveAndBeyondScore: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "ABOVE AND BEYOND SCORE REQUIRED",
                    },
                },
            },
            aboveAndBeyondComment: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "ABOVE AND BEYOND COMMENT REQUIRED",
                    },
                },
            },
            communicationScore: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "COMMUNICATION SCORE REQUIRED",
                    },
                },
            },
            communicationComment: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "COMMUNICATION COMMENT REQUIRED",
                    },
                },
            },
            evaluatorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "EVALUATOR ID REQUIRED",
                    },
                },
            },
            month: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "MONTH REQUIRED",
                    },
                },
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "YEAR REQUIRED",
                    },
                },
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        });
    },

    async down (queryInterface: QueryInterface) {
        await queryInterface.dropTable('evaluations');
    },
};
