"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const suppliers_controller_1 = require("../../controllers/Suppliers/suppliers.controller");
const supplierRouter = express_1.default.Router();
exports.supplierRouter = supplierRouter;
// * Función wrapper para manejar promesas...
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// ~ Proteger las rutas de Proveedores...
supplierRouter.use(asyncHandler(authMiddleware_1.authenticate));
supplierRouter.post('/supplier/new', asyncHandler((0, authMiddleware_1.authorize)(['Owner'])), suppliers_controller_1.registerSupplier);
//# sourceMappingURL=supplier.routes.js.map