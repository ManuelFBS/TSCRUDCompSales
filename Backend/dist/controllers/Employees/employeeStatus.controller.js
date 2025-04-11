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
exports.updateEmployeeStatus = exports.getEmployeeStatusByDni = void 0;
const models_1 = __importDefault(require("../../models"));
const employee_helper_1 = require("../../helpers/employee.helper");
const { EmployeeStatus } = models_1.default;
const getEmployeeStatusByDni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whereClause = (0, employee_helper_1.buildEmployeeWhereClause)(req);
        if (!whereClause) {
            return res.status(400).json({
                error: 'You must provide either an id or a dni',
            });
        }
        const status = yield EmployeeStatus.findOne({
            where: whereClause,
        });
        if (status) {
            res.status(200).json(status);
        }
        else {
            res.status(404).json({
                error: 'Employee status not found for this employee',
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEmployeeStatusByDni = getEmployeeStatusByDni;
const updateEmployeeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whereClause = (0, employee_helper_1.buildEmployeeWhereClause)(req);
        if (!whereClause) {
            return res.status(400).json({
                error: 'You must provide either an id or a dni',
            });
        }
        const [updated] = yield EmployeeStatus.update(req.body, {
            where: whereClause,
        });
        if (updated) {
            const updatedStatus = yield EmployeeStatus.findOne({
                where: whereClause,
            });
            res.status(200).json(updatedStatus);
        }
        else {
            res.status(404).json({
                error: 'Employee status not found',
            });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateEmployeeStatus = updateEmployeeStatus;
//# sourceMappingURL=employeeStatus.controller.js.map