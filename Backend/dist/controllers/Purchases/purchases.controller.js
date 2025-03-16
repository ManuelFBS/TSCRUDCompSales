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
const { ProductInventory, Purchases, PurchaseDetail, Supplier, User, } = models_1.default;
const registerPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { purchaseDate, userId, supplierId, products } = req.body;
    // * Se valida que el usuario y el proveedor existan...
    const user = yield User.findByPk(userId);
    const supplier = yield Supplier.findByPk(supplierId);
    if (!user || !supplier) {
        return res.status(404).json({
            message: 'Usuario o proveedor no encontrado',
        });
    }
    const t = yield db_1.default.transaction();
    try {
        // * Calcular el totalAmount sumando el totalPrice de cada producto...
        let totalAmount = 0;
        //
        for (const product of products) {
            const { quantity, unitPrice } = product;
            totalAmount += quantity * unitPrice;
        }
        // * Se crea la compra con el totalAmount calculado previamente...
        const purchase = yield Purchases.create({
            totalAmount,
            purchaseDate,
            userId,
            supplierId,
        }, { transaction: t });
        // * Procesar cada producto de la compra...
        for (const product of products) {
            const { productCode, brand, productName, description, quantity, unitPrice, } = product;
            // * Verificar si el producto ya existe en el inventario...
            let productInventory = yield ProductInventory.findOne({
                where: { productCode },
            });
            if (productInventory) {
                // > Si el producto existe, actualizar el stock...
                productInventory.stock += quantity;
                yield productInventory.save({
                    transaction: t,
                });
            }
            else {
                // > Si el producto no existe, crearlo...
                productInventory =
                    yield ProductInventory.create({
                        productCode,
                        brand,
                        productName,
                        description,
                        stock: quantity,
                        unitPrice,
                        isActive: true,
                    }, { transaction: t });
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