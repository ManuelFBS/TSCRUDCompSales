"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const Auth_controller_1 = require("../../controllers/Auth/Auth.controller");
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
// * Función wrapper para manejar promesas...
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
authRouter.post('/login', asyncHandler(Auth_controller_1.login));
authRouter.post('/logout', asyncHandler(Auth_controller_1.logout));
//# sourceMappingURL=auth.routes.js.map