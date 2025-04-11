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
exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeByIdDni = exports.getEmployees = exports.createEmployee = void 0;
const employeeSchema_1 = require("../../validations/schemas/employeeSchema/employeeSchema");
const DateFormatter_1 = require("../../utils/DateFormatter");
const employee_helper_1 = require("../../helpers/employee.helper");
const models_1 = __importDefault(require("../../models"));
const db_1 = __importDefault(require("../../config/db"));
const validationErrorHandler_1 = require("../../utils/validationErrorHandler");
const relations_1 = require("../../models/relations");
const { Employee, Department, EmployeeStatus } = models_1.default;
// ~Helper para obtener empleado con toda su información...
const getFullEmployeeData = (dni) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield Employee.findOne({
        where: { dni },
    });
    //
    if (!employee)
        return null;
    const department = yield Department.findOne({
        where: { dni },
    });
    const status = yield EmployeeStatus.findOne({
        where: { dni },
    });
    return Object.assign(Object.assign({}, employee.get({ plain: true })), { department: department === null || department === void 0 ? void 0 : department.department, position: department === null || department === void 0 ? void 0 : department.position, statusWork: status === null || status === void 0 ? void 0 : status.statusWork });
});
// ~ Se crea un nuevo empleado...
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // * Validar los datos de entrada usando la función genérica
        const validatedData = (0, validationErrorHandler_1.validateSchema)(employeeSchema_1.EmployeeSchema, req.body);
        const t = yield db_1.default.transaction();
        try {
            // * Formatear fecha...
            const formattedBirthDate = (0, DateFormatter_1.convertToMySQLDate)(req.body.birthDate);
            // * Validar conversión de fecha...
            if (!formattedBirthDate) {
                return res.status(400).json({
                    error: 'Fecha de nacimiento inválida',
                    message: 'Por favor, use el formato DD-MM-YYYY',
                });
            }
            const newEmployee = yield Employee.create({
                dni: validatedData.dni,
                name: validatedData.name,
                lastName: validatedData.lastName,
                birthDate: formattedBirthDate,
                email: validatedData.email,
                phone: validatedData.phone,
                country: validatedData.country,
            }, { transaction: t });
            // * Crear registro en Department...
            const dept = yield Department.create({
                dni: newEmployee.dni,
                department: req.body.department,
                position: req.body.position,
            }, { transaction: t });
            // * Crear registro en EmployeeStatus...
            const statusEmp = yield EmployeeStatus.create({
                dni: newEmployee.dni,
                statusWork: 'Activo',
            }, { transaction: t });
            yield t.commit();
            // res.status(201).json({
            //     message:
            //         'Employee created successfully...!!!',
            //     ID: newEmployee.id,
            //     DNI: newEmployee.dni,
            //     Nombres: newEmployee.name,
            //     Apellidos: newEmployee.lastName,
            //     FechaNacimiento: req.body.birthDate, // > Fecha original del input...
            //     FechaNacimientoFormateada:
            //         formattedBirthDate, // > Fecha en formato MySQL...
            //     Email: newEmployee.email,
            //     Telefono: newEmployee.phone,
            //     Pais: newEmployee.country,
            //     EstadoLaboral: statusEmp.statusWork,
            //     Departamento: dept.department,
            //     Cargo: dept.position,
            // });
            res.status(201).json(Object.assign(Object.assign({}, newEmployee.get({ plain: true })), { department: dept.department, position: dept.position, statusWork: statusEmp.statusWork }));
        }
        catch (error) {
            yield t.rollback();
            // * Manejo de errores específicos
            if (error instanceof Error) {
                // > Si es un error estándar de JavaScript
                res.status(400).json({
                    error: error.message,
                    type: 'ValidationError',
                });
            }
            else {
                // * Para otros tipos de errores
                res.status(500).json({
                    error: 'Error interno del servidor',
                    details: (error === null || error === void 0 ? void 0 : error.toString()) ||
                        'Error desconocido',
                });
            }
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
exports.createEmployee = createEmployee;
// ~Se obtienen todos los empleados...
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield Employee.findAll({
            attributes: [
                'dni',
                'name',
                'lastName',
                'email',
                'phone',
            ],
        });
        const employeeDetails = yield Promise.all(employees.map((emp) => __awaiter(void 0, void 0, void 0, function* () {
            const department = yield Department.findOne({ where: { dni: emp.dni } });
            //
            const status = yield EmployeeStatus.findOne({ where: { dni: emp.dni } });
            return Object.assign(Object.assign({}, emp.get({ plain: true })), { department: department === null || department === void 0 ? void 0 : department.department, position: department === null || department === void 0 ? void 0 : department.position, statusWork: status === null || status === void 0 ? void 0 : status.statusWork });
        })));
        // !res.status(200).json(employees);
        res.status(200).json(employeeDetails);
    }
    catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            details: (error === null || error === void 0 ? void 0 : error.toString()) || 'Error desconocido',
        });
    }
});
exports.getEmployees = getEmployees;
// ~Se obtienen un empleado determinado...
const getEmployeeByIdDni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whereClause = (0, employee_helper_1.buildEmployeeWhereClause)(req);
        if (!whereClause) {
            return res.status(400).json({
                error: 'You must provide either an id or a dni',
            });
        }
        // !const employee = await Employee.findOne({
        //  !   where: whereClause,
        // !});
        const fullEmployeeData = yield getFullEmployeeData(req.params.dni);
        if (fullEmployeeData) {
            res.status(200).json(fullEmployeeData);
        }
        else {
            res.status(404).json({
                error: 'Employee not found...!',
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEmployeeByIdDni = getEmployeeByIdDni;
// ~Se actualizan los datos de un empleado...
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whereClause = (0, employee_helper_1.buildEmployeeWhereClause)(req);
        if (!whereClause) {
            return res.status(400).json({
                error: 'You must provide either an id or a dni',
            });
        }
        const validatedData = employeeSchema_1.EmployeeSchema.parse(req.body); // > Valida los datos de entrada...
        //  !const [updated] = await Employee.update(
        //  !   validatedData,
        //  !  {
        //  !       where: whereClause,
        //  !  },
        // !);
        // !if (updated) {
        // !   const updatedEmployee = await Employee.findOne({
        // !      where: whereClause,
        // !   });
        //  !   res.status(200).json(updatedEmployee);
        // ! } else {
        // !    res.status(404).json({
        // !       error: 'Employee not found',
        // !   });
        // ! }
        const t = yield db_1.default.transaction();
        try {
            const [updated] = yield Employee.update(validatedData, {
                where: whereClause,
                transaction: t,
            });
            if (!updated) {
                yield t.rollback();
                return res.status(404).json({
                    error: 'Employee not found',
                });
            }
            // *Actualizar departamento si se proporciona en el body...
            if (req.body.department || req.body.position) {
                yield Department.update({
                    department: req.body.department,
                    position: req.body.position,
                }, {
                    where: whereClause,
                    transaction: t,
                });
            }
            yield t.commit();
            const updatedEmployee = yield getFullEmployeeData(req.body.dni);
            res.status(200).json(updatedEmployee);
        }
        catch (error) {
            yield t.rollback();
            throw error;
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateEmployee = updateEmployee;
// ~Se elimina un empleado...
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whereClause = (0, employee_helper_1.buildEmployeeWhereClause)(req);
        if (!whereClause) {
            return res.status(400).json({
                error: 'You must provide either an id or a dni',
            });
        }
        // !const deleted = await Employee.destroy({
        // !    where: whereClause,
        // !});
        // !if (deleted) {
        // !    res.status(200).json({
        // !        message: 'Employee has been deleted...!!!',
        // !    });
        // !} else {
        // !    res.status(404).json({
        // !        message: 'Employee not found...!',
        // !    });
        // !}
        const t = yield db_1.default.transaction();
        try {
            // *Eliminar en cascada...
            yield Promise.all([
                relations_1.User.destroy({
                    where: whereClause,
                    transaction: t,
                }),
                Department.destroy({
                    where: whereClause,
                    transaction: t,
                }),
                EmployeeStatus.destroy({
                    where: whereClause,
                    transaction: t,
                }),
                Employee.destroy({
                    where: whereClause,
                    transaction: t,
                }),
            ]);
            yield t.commit();
            res.status(200).json({
                message: 'Employee and all related data has been deleted...!!!',
            });
        }
        catch (error) {
            yield t.rollback();
            throw error;
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteEmployee = deleteEmployee;
//# sourceMappingURL=employees.controller.js.map