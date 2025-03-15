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
exports.getCustomerByIdDni = exports.getAllCustomers = exports.registerCustomer = void 0;
const customerSchema_1 = require("../../validations/schemas/customerSchema/customerSchema");
const employee_helper_1 = require("../../helpers/employee.helper");
const models_1 = __importDefault(require("../../models"));
const db_1 = __importDefault(require("../../config/db"));
const validationErrorHandler_1 = require("../../utils/validationErrorHandler");
const { Customer } = models_1.default;
// ~ Registro de nuevo cliente...
const registerCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // * Validar los datos de entrada usando la función genérica
        const validatedData = (0, validationErrorHandler_1.validateSchema)(customerSchema_1.CustomerSchema, req.body);
        const t = yield db_1.default.transaction();
        try {
            const newCustomer = yield Customer.create({
                dni: validatedData.dni,
                name: validatedData.name,
                lastName: validatedData.lastName,
                address: validatedData.address,
                phone: validatedData.phone,
            }, { transaction: t });
            yield t.commit();
            res.status(201).json({
                message: 'El nuevo Cliente ha sido registrado exitosamente...!!!',
                newCustomer,
            });
        }
        catch (error) {
            yield t.rollback();
            res.status(500).json({
                message: 'Error al intentar registrar al nuevo Cliente...!',
                error,
            });
        }
    }
    catch (error) {
        // * Se captura el error lanzado por validateSchema...
        res.status(error.status || 500).json({
            message: error.message ||
                'Error interno del servidor',
            errors: error.errors || undefined,
        });
    }
});
exports.registerCustomer = registerCustomer;
const getAllCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield Customer.findAll({
            attributes: [
                'dni',
                'name',
                'lastName',
                'address',
            ],
        });
        res.status(200).json(customers);
    }
    catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            details: (error === null || error === void 0 ? void 0 : error.toString()) || 'Error desconocido',
        });
    }
});
exports.getAllCustomers = getAllCustomers;
const getCustomerByIdDni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whereClause = (0, employee_helper_1.buildEmployeeWhereClause)(req);
        if (!whereClause) {
            return res.status(400).json({
                error: 'You must provide either an id or a dni',
            });
        }
        const customer = yield Customer.findOne({
            where: whereClause,
        });
        if (customer) {
            res.status(200).json(customer);
        }
        else {
            res.status(404).json({
                error: 'Customer not found...!',
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getCustomerByIdDni = getCustomerByIdDni;
//# sourceMappingURL=customers.controller.js.map