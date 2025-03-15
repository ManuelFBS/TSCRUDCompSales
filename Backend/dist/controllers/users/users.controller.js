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
exports.deleteUser = exports.updateUser = exports.getUserByIdDniUser = exports.getUsers = exports.createUser = void 0;
const userSchema_1 = require("../../validations/schemas/userSchema/userSchema");
const models_1 = __importDefault(require("../../models"));
const db_1 = __importDefault(require("../../config/db"));
const validationErrorHandler_1 = require("../../utils/validationErrorHandler");
const authUtils_1 = require("../../utils/authUtils");
const user_helper_1 = require("../../helpers/user.helper");
const { User, Employee } = models_1.default;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = (0, validationErrorHandler_1.validateSchema)(userSchema_1.UserSchema, req.body);
        const t = yield db_1.default.transaction();
        try {
            // * Se verificar si el empleado existe...
            const employee = yield Employee.findOne({
                where: { dni: validatedData.dni },
            });
            if (!employee) {
                return res.status(404).json({
                    error: 'Employee not found...!',
                });
            }
            // * Se procede a encriptar el password...
            const hashedPassword = yield (0, authUtils_1.HashPassword)(validatedData.password);
            //
            validatedData.password = hashedPassword;
            // * Se crea el usuario...
            const newUser = yield User.create({
                dni: validatedData.dni,
                user: validatedData.user,
                password: validatedData.password,
                role: validatedData.role,
                status: validatedData.status,
            }, { transaction: t });
            yield t.commit();
            res.status(201).json({
                message: 'New User has been created successfully...!!!',
                DNI: newUser.dni,
                Usuario: newUser.user,
                Rol: newUser.role,
                Status: newUser.status,
            });
        }
        catch (error) {
            yield t.rollback();
            res.status(500).json({ error: error.message });
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
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.findAll({
            attributes: ['id', 'dni', 'user', 'role'],
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUsers = getUsers;
const getUserByIdDniUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whereClause = (0, user_helper_1.buildUserWhereClause)(req);
        if (!whereClause) {
            return res.status(400).json({
                error: 'You must provide either an id or a user...',
            });
        }
        const user = yield User.findOne({
            where: whereClause,
            include: [
                {
                    model: Employee,
                    as: 'employee',
                    attributes: [
                        'name',
                        'lastName',
                        'email',
                        'phone',
                    ],
                },
            ],
        });
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({
                error: 'User not found...!',
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUserByIdDniUser = getUserByIdDniUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = userSchema_1.UserSchema.parse(req.body);
        // * Si se proporciona una nueva contraseña, encriptarla...
        if (validatedData.password) {
            validatedData.password = yield (0, authUtils_1.HashPassword)(validatedData.password);
        }
        const [updated] = yield User.update(validatedData, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedUser = yield User.findByPk(req.params.id, {
                include: [
                    {
                        model: Employee,
                        as: 'employee',
                        attributes: [
                            'name',
                            'lastName',
                            'email',
                        ],
                    },
                ],
            });
            res.status(200).json(updatedUser);
        }
        else {
            res.status(404).json({
                error: 'User not found',
            });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const whereClause = (0, user_helper_1.buildUserWhereClause)(req);
    try {
        const deleted = yield User.destroy({
            where: { whereClause },
        });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({
                error: 'User not found',
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.controller.js.map