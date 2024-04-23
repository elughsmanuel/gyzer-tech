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
            workQuality: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "WORK QUALITY REQUIRED",
                    },
                },
            },
            workQualityNote: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "WORK QUALITY NOTE REQUIRED",
                    },
                },
            },
            taskCompletion: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "TASK COMPLETION REQUIRED",
                    },
                },
            },
            taskCompletionNote: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "TASK COMPLETION NOTE REQUIRED",
                    },
                },
            },
            aboveAndBeyond: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "ABOVE AND BEYOND REQUIRED",
                    },
                },
            },
            aboveAndBeyondNote: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "ABOVE AND BEYOND NOTE REQUIRED",
                    },
                },
            },
            communication: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "COMMUNICATION REQUIRED",
                    },
                },
            },
            communicationNote: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "COMMUNICATION NOTE REQUIRED",
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
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        });
    },

    async down (queryInterface: QueryInterface) {
        await queryInterface.dropTable('evaluations');
    },
};
