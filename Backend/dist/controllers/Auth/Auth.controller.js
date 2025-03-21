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
exports.logout = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authUtils_1 = require("../../utils/authUtils");
const models_1 = __importDefault(require("../../models"));
const auth_1 = require("../../config/auth");
const { BlacklistedToken, User } = models_1.default;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, password } = req.body;
        // * Buscar el usuario en la base de datos...
        const foundUser = yield User.findOne({
            where: { user },
        });
        if (!foundUser) {
            return res
                .status(404)
                .json({ error: 'User not found...!' });
        }
        // * Se verifica el password...
        const isPasswordValid = yield (0, authUtils_1.ComparePassword)(password, foundUser.password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ error: 'Invalid password...!' });
        }
        // * Generar el token JWT...
        const token = jsonwebtoken_1.default.sign({
            id: foundUser.id,
            dni: foundUser.dni,
            role: foundUser.role,
        }, auth_1.JWT_SECRET, {
            expiresIn: auth_1.JWT_EXPIRES_IN,
        });
        // * Se envía el token de respuesta...
        res.status(200).json({
            token,
            user: {
                id: foundUser.id,
                dni: foundUser.dni,
                role: foundUser.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req
            .header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            return res
                .status(400)
                .json({ error: 'No token provided' });
        }
        // * Agregar el token a la lista negra...
        yield BlacklistedToken.create({ token });
        res.status(200).json({
            message: 'Logged out successfully',
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.logout = logout;
//# sourceMappingURL=Auth.controller.js.map