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
exports.createEmployee = void 0;
const Employee_1 = __importDefault(require("../../models/employees/Employee"));
const employeeSchema_1 = require("../../validations/schemas/employeeSchema/employeeSchema");
const DateFormatter_1 = require("../../utils/DateFormatter");
// ~ Se crea un nuevo empleado...
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dni, name, lastName, birthDate, email, phone, country, statusWork, department, position, } = req.body;
        // * Validación de datos...
        const validatedData = employeeSchema_1.EmployeeSchema.parse(req.body);
        // * Formatear fecha...
        const formattedBirthDate = (0, DateFormatter_1.convertToMySQLDate)(birthDate);
        // * Validar conversión de fecha...
        if (!formattedBirthDate) {
            return res.status(400).json({
                error: 'Fecha de nacimiento inválida',
                message: 'Por favor, use el formato DD/MM/YYYY',
            });
        }
        const newEmployee = yield Employee_1.default.create({
            dni: validatedData.dni,
            name: validatedData.name,
            lastName: validatedData.lastName,
            birthDate: formattedBirthDate,
            email: validatedData.email,
            phone: validatedData.phone,
            country: validatedData.country,
        });
        res.status(201).json({
            message: 'Employee created successfully...!!!',
            ID: newEmployee.id,
            DNI: newEmployee.dni,
            Nombres: newEmployee.name,
            Apellidos: newEmployee.lastName,
            FechaNacimiento: birthDate, // > Fecha original del input...
            FechaNacimientoFormateada: formattedBirthDate, // > Fecha en formato MySQL...
            Email: newEmployee.email,
            Telefono: newEmployee.phone,
            Pais: newEmployee.country,
            EstadoLaboral: statusWork,
            Departamento: department,
            Cargo: position,
        });
    }
    catch (error) {
        // Manejo de errores específicos
        if (error instanceof Error) {
            // Si es un error estándar de JavaScript
            res.status(400).json({
                error: error.message,
                type: 'ValidationError',
            });
        }
        else {
            // Para otros tipos de errores
            res.status(500).json({
                error: 'Error interno del servidor',
                details: (error === null || error === void 0 ? void 0 : error.toString()) ||
                    'Error desconocido',
            });
        }
    }
});
exports.createEmployee = createEmployee;
//# sourceMappingURL=employees.controller.js.map