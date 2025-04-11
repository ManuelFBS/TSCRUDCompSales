"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const customers_controller_1 = require("../../controllers/Customers/customers.controller");
const customerRouter = express_1.default.Router();
exports.customerRouter = customerRouter;
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
customerRouter.use(asyncHandler(authMiddleware_1.authenticate));
customerRouter.post('/customer/new', asyncHandler((0, authMiddleware_1.authorize)(['Owner', 'Admin', 'Employee'])), customers_controller_1.registerCustomer);
customerRouter.get('/', asyncHandler((0, authMiddleware_1.authorize)(['Owner', 'Admin', 'Employee'])), customers_controller_1.getAllCustomers);
customerRouter.get('/customer/search/:id?', asyncHandler((0, authMiddleware_1.authorize)(['Owner', 'Admin', 'Employee'])), asyncHandler(customers_controller_1.getCustomerByIdDni));
//# sourceMappingURL=customer.routes.js.map