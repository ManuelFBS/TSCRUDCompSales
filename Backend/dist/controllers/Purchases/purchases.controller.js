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
exports.registerPurchase = void 0;
const models_1 = __importDefault(require("../../models"));
const db_1 = __importDefault(require("../../config/db"));
const { ProductInventory, Purchases, PurchaseDetail, Supplier, } = models_1.default;
const registerPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { products, totalAmount, userId, supplierId } = req.body;
    const t = yield db_1.default.transaction();
    try {
        // * Se crea la compra...
        const purchase = yield Purchases.create({
            totalAmount,
            purchaseDate: new Date(),
            userId,
            supplierId,
        }, { transaction: t });
        // * Procesar cada producto de la compra...
        for (const product of products) {
            const { productCode, productName, description, unitPrice, quantity, } = product;
            // * Verificar si el producto ya existe en el inventario...
            let productInventory = yield ProductInventory.findOne({
                where: productCode,
            });
            if (!productInventory) {
                // > Si el producto no existe, crearlo...
                productInventory =
                    yield ProductInventory.create({
                        productCode,
                        productName,
                        description,
                        unitPrice,
                        stock: quantity, // Stock inicial
                    }, { transaction: t });
            }
            else {
                // > Si el producto existe, actualizar el stock...
                productInventory.stock += quantity;
                yield productInventory.save({
                    transaction: t,
                });
            }
            // * Crear el detalle de la compra...
            yield PurchaseDetail.create({
                purchasesId: purchase.id,
                productInventoryId: productInventory.id,
                quantity,
                unitPrice,
                totalPrice: quantity * unitPrice,
            }, { transaction: t });
        }
        // * Confirmar la transacción...
        yield t.commit();
        res.status(201).json({
            message: 'Compra creada exitosamente...!!!',
            purchase,
        });
    }
    catch (error) {
        // * Revertir la transacción en caso de error...
        yield t.rollback();
        res.status(500).json({
            message: 'Error al crear la compra...!',
            error,
        });
    }
});
exports.registerPurchase = registerPurchase;
//# sourceMappingURL=purchases.controller.js.map