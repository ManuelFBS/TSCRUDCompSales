"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const purchases_controller_1 = require("../../controllers/Purchases/purchases.controller");
const purchaseRouter = express_1.default.Router();
exports.purchaseRouter = purchaseRouter;
// * Función wrapper para manejar promesas...
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// ~ Proteger las rutas de Purchases...
purchaseRouter.use(asyncHandler(authMiddleware_1.authenticate));
purchaseRouter.post('/purchase/new', asyncHandler((0, authMiddleware_1.authorize)(['Owner', 'Admin'])), asyncHandler(purchases_controller_1.registerPurchase));
//# sourceMappingURL=purchase.routes.js.map