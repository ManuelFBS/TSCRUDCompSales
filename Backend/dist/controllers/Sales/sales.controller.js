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
exports.registerSale = void 0;
const models_1 = __importDefault(require("../../models"));
const db_1 = __importDefault(require("../../config/db"));
const { Sales, SalesDetail, Customer, ProductInventory } = models_1.default;
const registerSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { products, totalAmount, tax, userId, customer } = req.body;
    const t = yield db_1.default.transaction();
    try {
        //
    }
    catch (error) {
        //
    }
});
exports.registerSale = registerSale;
//# sourceMappingURL=sales.controller.js.map