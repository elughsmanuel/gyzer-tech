'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Evaluation extends sequelize_1.Model {
}
Evaluation.init({
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
                msg: "EVERLUATEE ID REQUIRED",
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
}, {
    sequelize: _1.default,
    modelName: 'evaluation',
    tableName: 'evaluations',
});
exports.default = Evaluation;
