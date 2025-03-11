"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlacklistedToken = exports.Department = exports.EmployeeStatus = exports.User = exports.Employee = void 0;
const Employee_1 = __importDefault(require("./employees/Employee"));
exports.Employee = Employee_1.default;
const User_1 = __importDefault(require("./users/User"));
exports.User = User_1.default;
const EmployeeStatus_1 = __importDefault(require("./employees/EmployeeStatus"));
exports.EmployeeStatus = EmployeeStatus_1.default;
const Department_1 = __importDefault(require("./employees/Department"));
exports.Department = Department_1.default;
const BlacklistedToken_1 = __importDefault(require("./tokens/BlacklistedToken"));
exports.BlacklistedToken = BlacklistedToken_1.default;
// ~ Relación Employee - User...
Employee_1.default.hasOne(User_1.default, {
    foreignKey: 'dni',
    sourceKey: 'dni',
    as: 'user',
});
User_1.default.belongsTo(Employee_1.default, {
    foreignKey: 'dni',
    targetKey: 'dni',
    as: 'employee',
});
// ~ Relación Employee - EmployeeStatus...
Employee_1.default.hasOne(EmployeeStatus_1.default, {
    foreignKey: 'dni',
    sourceKey: 'dni',
    as: 'employeeStatus',
});
EmployeeStatus_1.default.belongsTo(Employee_1.default, {
    foreignKey: 'dni',
    targetKey: 'dni',
    as: 'employee',
});
// ~ Relación Employee - Department...
Employee_1.default.hasOne(Department_1.default, {
    foreignKey: 'dni',
    sourceKey: 'dni',
    as: 'department',
});
Department_1.default.belongsTo(Employee_1.default, {
    foreignKey: 'dni',
    targetKey: 'dni',
    as: 'employee',
});
//# sourceMappingURL=relations.js.map