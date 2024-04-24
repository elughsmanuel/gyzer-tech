'use strict';

import { Model, DataTypes } from "sequelize";
import sequelize from ".";

interface EvaluationAttributes {
    id?: number;
    evaluateeId: number;
    workQualityScore: number;
    workQualityComment: string;
    taskCompletionScore: number;
    taskCompletionComment: string;
    aboveAndBeyondScore: number;
    aboveAndBeyondComment: string;
    communicationScore: number;
    communicationComment: string;
    evaluatorId: number;
    month: string;
    year: string;
    createdAt?: Date,
    updatedAt?: Date,
}

class Evaluation extends Model<EvaluationAttributes> implements EvaluationAttributes {
    public id!: number;
    public evaluateeId!: number;
    public workQualityScore!: number;
    public workQualityComment!: string;
    public taskCompletionScore!: number;
    public taskCompletionComment!: string;
    public aboveAndBeyondScore!: number;
    public aboveAndBeyondComment!: string;
    public communicationScore!: number;
    public communicationComment!: string;
    public evaluatorId!: number;
    public month!: string;
    public year!: string;
    public createdAt?: Date;
    public updatedAt?: Date;
}

Evaluation.init({
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
                msg: "EVERLUATEE ID REQUIRED",
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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "YEAR REQUIRED",
            },
        },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize: sequelize!,
    modelName: 'evaluation',
    tableName: 'evaluations',
});

export default Evaluation;
