"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../../controllers/Users/users.controller");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
// * Función wrapper para manejar promesas...
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
userRouter.post('/user/new', asyncHandler(users_controller_1.createUser));
userRouter.get('/', users_controller_1.getUsers);
userRouter.get('/user/search/:id?', asyncHandler(users_controller_1.getUserByIdDniUser));
//# sourceMappingURL=user.routes.js.map