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
exports.updateUser = exports.getUserByIdUser = exports.getUsers = exports.createUser = void 0;
const userSchema_1 = require("../../validations/schemas/userSchema/userSchema");
const models_1 = __importDefault(require("../../models"));
const user_helper_1 = require("../../helpers/user.helper");
const { User, Employee } = models_1.default;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = userSchema_1.UserSchema.parse(req.body);
        // * Se verificar si el empleado existe...
        const employee = yield Employee.findOne({
            where: { dni: validatedData.dni },
        });
        if (!employee) {
            return res.status(404).json({
                error: 'Employee not found...!',
            });
        }
        // * Se crea el usuario...
        const user = yield User.create(validatedData);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.findAll({
            include: [
                {
                    model: Employee,
                    as: 'employee',
                },
            ],
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUsers = getUsers;
const getUserByIdUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whereClause = (0, user_helper_1.buildUserWhereClause)(req);
        if (!whereClause) {
            return res.status(400).json({
                error: 'You must provide either an id or a user...',
            });
        }
        const user = yield User.findOne({
            where: whereClause,
        });
        if (user) {
            const userEssentialData = {
                DNI: user.dni,
                Usuario: user.user,
                Rol: user.role,
                Status: user.status,
            };
            // res.status(200).json(user);
            res.status(200).json(userEssentialData);
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
exports.getUserByIdUser = getUserByIdUser;
const updateUser = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateUser = updateUser;
//# sourceMappingURL=users.controller.js.map