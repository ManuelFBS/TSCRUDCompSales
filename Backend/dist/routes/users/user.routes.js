"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const users_controller_1 = require("../../controllers/Users/users.controller");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
// * Función wrapper para manejar promesas...
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// ~ Proteger todas las rutas de usuarios...
userRouter.use(asyncHandler(authMiddleware_1.authenticate));
userRouter.post('/user/new', asyncHandler((0, authMiddleware_1.authorize)(['Owner', 'Admin'])), asyncHandler(users_controller_1.createUser));
userRouter.get('/', asyncHandler((0, authMiddleware_1.authorize)(['Owner', 'Admin'])), users_controller_1.getUsers);
userRouter.get('/user/search/:id?', asyncHandler((0, authMiddleware_1.authorize)(['Owner', 'Admin'])), asyncHandler(users_controller_1.getUserByIdDniUser));
userRouter.patch('/user/edit/:id', asyncHandler((0, authMiddleware_1.authorize)(['Owner', 'Admin'])), users_controller_1.updateUser);
userRouter.delete('/user/delete/:id?', asyncHandler((0, authMiddleware_1.authorize)(['Owner', 'Admin'])), users_controller_1.deleteUser);
//# sourceMappingURL=user.routes.js.map