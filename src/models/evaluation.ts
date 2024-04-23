'use strict';

import { Model, DataTypes } from "sequelize";
import sequelize from ".";

interface EvaluationAttributes {
    id?: number;
    evaluateeId: number;
    workQuality: number;
    workQualityNote: string;
    taskCompletion: number;
    taskCompletionNote: string;
    aboveAndBeyond: number;
    aboveAndBeyondNote: string;
    communication: number;
    communicationNote: string;
    evaluatorId: number;
    createdAt?: Date,
    updatedAt?: Date,
}

class Evaluation extends Model<EvaluationAttributes> implements EvaluationAttributes {
    public id!: number;
    public evaluateeId!: number;
    public workQuality!: number;
    public workQualityNote!: string;
    public taskCompletion!: number;
    public taskCompletionNote!: string;
    public aboveAndBeyond!: number;
    public aboveAndBeyondNote!: string;
    public communication!: number;
    public communicationNote!: string;
    public evaluatorId!: number;
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
}, {
    sequelize: sequelize!,
    modelName: 'evaluation',
    tableName: 'evaluations',
});

export default Evaluation;
