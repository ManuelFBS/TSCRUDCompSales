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
exports.getSuppliers = exports.registerSupplier = void 0;
const models_1 = __importDefault(require("../../models"));
const db_1 = __importDefault(require("../../config/db"));
const { Supplier } = models_1.default;
const registerSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rif, companyName, address, code, country } = req.body;
    const t = yield db_1.default.transaction();
    try {
        const newSupplier = yield Supplier.create({
            rif,
            companyName,
            address,
            code,
            country,
        }, { transaction: t });
        yield t.commit();
        res.status(201).json({
            message: 'El nuevo Proveedor ha sido registrado exitosamente...!!!',
            newSupplier,
        });
    }
    catch (error) {
        yield t.rollback();
        res.status(500).json({
            message: 'Error al intentar registrar al nuevo Proveedor...!',
            error,
        });
    }
});
exports.registerSupplier = registerSupplier;
const getSuppliers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const suppliers = yield Supplier.findAll({
            attributes: [
                'rif',
                'companyName',
                'address',
                'code',
                'country',
            ],
        });
        res.status(200).json(suppliers);
    }
    catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            details: (error === null || error === void 0 ? void 0 : error.toString()) || 'Error desconocido',
        });
    }
});
exports.getSuppliers = getSuppliers;
//# sourceMappingURL=suppliers.controller.js.map