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
exports.updateDepartment = exports.getDepartmentByDni = void 0;
const models_1 = __importDefault(require("../../models"));
const employee_helper_1 = require("../../helpers/employee.helper");
const { Department } = models_1.default;
const getDepartmentByDni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whereClause = (0, employee_helper_1.buildEmployeeWhereClause)(req);
        if (!whereClause) {
            return res.status(400).json({
                error: 'You must provide either an id or a dni',
            });
        }
        const department = yield Department.findOne({
            where: whereClause,
        });
        if (department) {
            res.status(200).json(department);
        }
        else {
            res.status(404).json({
                error: 'Department not found for this employee',
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getDepartmentByDni = getDepartmentByDni;
const updateDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whereClause = (0, employee_helper_1.buildEmployeeWhereClause)(req);
        if (!whereClause) {
            return res.status(400).json({
                error: 'You must provide either an id or a dni',
            });
        }
        const [updated] = yield Department.update(req.body, {
            where: whereClause,
        });
        if (updated) {
            const updatedDepartment = yield Department.findOne({
                where: whereClause,
            });
            res.status(200).json(updatedDepartment);
        }
        else {
            res.status(404).json({
                error: 'Department not found',
            });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateDepartment = updateDepartment;
//# sourceMappingURL=departments.controller.js.map