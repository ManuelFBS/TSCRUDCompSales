"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlacklistedToken = exports.PurchaseDetail = exports.Supplier = exports.Purchases = exports.SalesDetail = exports.Customer = exports.Sales = exports.ProductInventory = exports.Department = exports.EmployeeStatus = exports.User = exports.Employee = void 0;
const Employee_1 = __importDefault(require("./employees/Employee"));
exports.Employee = Employee_1.default;
const User_1 = __importDefault(require("./users/User"));
exports.User = User_1.default;
const EmployeeStatus_1 = __importDefault(require("./employees/EmployeeStatus"));
exports.EmployeeStatus = EmployeeStatus_1.default;
const Department_1 = __importDefault(require("./employees/Department"));
exports.Department = Department_1.default;
const ProductInventory_1 = __importDefault(require("./products/ProductInventory"));
exports.ProductInventory = ProductInventory_1.default;
const Sales_1 = __importDefault(require("./sales/Sales"));
exports.Sales = Sales_1.default;
const SalesDetail_1 = __importDefault(require("./sales/SalesDetail"));
exports.SalesDetail = SalesDetail_1.default;
const Customer_1 = __importDefault(require("./customers/Customer"));
exports.Customer = Customer_1.default;
const Purchases_1 = __importDefault(require("./purchases/Purchases"));
exports.Purchases = Purchases_1.default;
const PurchaseDetail_1 = __importDefault(require("./purchases/PurchaseDetail"));
exports.PurchaseDetail = PurchaseDetail_1.default;
const Supplier_1 = __importDefault(require("./suppliers/Supplier"));
exports.Supplier = Supplier_1.default;
const BlacklistedToken_1 = __importDefault(require("./tokens/BlacklistedToken"));
exports.BlacklistedToken = BlacklistedToken_1.default;
// ~ Relación Employee - User...
Employee_1.default.hasOne(User_1.default, {
    foreignKey: 'dni',
    sourceKey: 'dni',
    as: 'user',
});
User_1.default.belongsTo(Employee_1.default, {
    foreignKey: 'dni',
    targetKey: 'dni',
    as: 'employee',
});
// ~ Relación Employee - EmployeeStatus...
Employee_1.default.hasOne(EmployeeStatus_1.default, {
    foreignKey: 'dni',
    sourceKey: 'dni',
    as: 'employeeStatus',
});
EmployeeStatus_1.default.belongsTo(Employee_1.default, {
    foreignKey: 'dni',
    targetKey: 'dni',
    as: 'employee',
});
// ~ Relación Employee - Department...
Employee_1.default.hasOne(Department_1.default, {
    foreignKey: 'dni',
    sourceKey: 'dni',
    as: 'department',
});
Department_1.default.belongsTo(Employee_1.default, {
    foreignKey: 'dni',
    targetKey: 'dni',
    as: 'employee',
});
// ~ Relación entre Sales y SalesDetail...
Sales_1.default.hasMany(SalesDetail_1.default, { foreignKey: 'salesId' });
SalesDetail_1.default.belongsTo(Sales_1.default, { foreignKey: 'salesId' });
// ~ Relación entre Sales y Customer...
Sales_1.default.belongsTo(Customer_1.default, {
    foreignKey: 'customerId',
    as: 'customer',
});
Customer_1.default.hasMany(Sales_1.default, {
    foreignKey: 'customerId',
    as: 'sales',
});
// ~ Relación entre ProductInventory y SalesDetail...
ProductInventory_1.default.hasMany(SalesDetail_1.default, {
    foreignKey: 'productInventoryId',
});
SalesDetail_1.default.belongsTo(ProductInventory_1.default, {
    foreignKey: 'productInventoryId',
});
// ~ Relación entre Purchases y PurchaseDetail...
Purchases_1.default.hasMany(PurchaseDetail_1.default, {
    foreignKey: 'purchasesId',
});
PurchaseDetail_1.default.belongsTo(ProductInventory_1.default, {
    foreignKey: 'purchasesId',
});
// ~ Relación entre Purchases y Supplier...
Purchases_1.default.belongsTo(Supplier_1.default, {
    foreignKey: 'supplierId',
    as: 'supplier',
});
Supplier_1.default.hasMany(Purchases_1.default, {
    foreignKey: 'supplierId',
    as: 'purchases',
});
// ~ Relación entre User y Sales...
User_1.default.hasMany(Sales_1.default, {
    foreignKey: 'userId',
    as: 'sales',
});
Sales_1.default.belongsTo(User_1.default, {
    foreignKey: 'userId',
    as: 'user',
});
// ~ Relación entre User y Purchases...
User_1.default.hasMany(Purchases_1.default, {
    foreignKey: 'userId',
    as: 'purchases',
});
Purchases_1.default.belongsTo(User_1.default, {
    foreignKey: 'userId',
    as: 'user',
});
//# sourceMappingURL=relations.js.map