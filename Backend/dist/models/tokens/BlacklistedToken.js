"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
class BlacklistedToken extends sequelize_1.Model {
}
BlacklistedToken.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: db_1.default,
    modelName: 'BlacklistedToken',
    tableName: 'blacklisted_tokens',
    timestamps: false,
});
exports.default = BlacklistedToken;
//# sourceMappingURL=BlacklistedToken.js.map