import Employee from './employees/Employee';
import User from './users/User';
import EmployeeStatus from './employees/EmployeeStatus';
import Department from './employees/Department';
import ProductInventory from './products/ProductInventory';
import Sales from './sales/Sales';
import SalesDetail from './sales/SalesDetail';
import Customer from './customers/Customer';
import Purchases from './purchases/Purchases';
import PurchaseDetail from './purchases/PurchaseDetail';
import Supplier from './suppliers/Supplier';
import Session from './sessions/Session';
import BlacklistedToken from './tokens/BlacklistedToken';

// ~ Relación Employee - User...
Employee.hasOne(User, {
    foreignKey: 'dni',
    sourceKey: 'dni',
    as: 'user',
});
User.belongsTo(Employee, {
    foreignKey: 'dni',
    targetKey: 'dni',
    as: 'employee',
});

// ~ Relación User - Session...
User.hasMany(Session, {
    foreignKey: 'dni',
    as: 'session',
});
Session.belongsTo(User, {
    foreignKey: 'dni',
    as: 'user',
});

// ~ Relación Employee - EmployeeStatus...
Employee.hasOne(EmployeeStatus, {
    foreignKey: 'dni',
    sourceKey: 'dni',
    as: 'employeeStatus',
});
EmployeeStatus.belongsTo(Employee, {
    foreignKey: 'dni',
    targetKey: 'dni',
    as: 'employee',
});

// ~ Relación Employee - Department...
Employee.hasOne(Department, {
    foreignKey: 'dni',
    sourceKey: 'dni',
    as: 'department',
});
Department.belongsTo(Employee, {
    foreignKey: 'dni',
    targetKey: 'dni',
    as: 'employee',
});

// ~ Relación entre Sales y SalesDetail...
Sales.hasMany(SalesDetail, {
    foreignKey: 'salesId',
    as: 'details',
});
SalesDetail.belongsTo(Sales, {
    foreignKey: 'salesId',
    as: 'sale',
});

// ~ Relación entre Sales y Customer...
Sales.belongsTo(Customer, {
    foreignKey: 'customerId',
    as: 'customer',
});
Customer.hasMany(Sales, {
    foreignKey: 'customerId',
    as: 'sales',
});

// ~ Relación entre ProductInventory y SalesDetail...
ProductInventory.hasMany(SalesDetail, {
    foreignKey: 'productInventoryId',
});
SalesDetail.belongsTo(ProductInventory, {
    foreignKey: 'productInventoryId',
});

// ~ Relación entre Purchases y PurchaseDetail...
Purchases.hasMany(PurchaseDetail, {
    foreignKey: 'purchasesId',
});
PurchaseDetail.belongsTo(ProductInventory, {
    foreignKey: 'purchasesId',
});

// ~ Relación entre Purchases y Supplier...
Purchases.belongsTo(Supplier, {
    foreignKey: 'supplierId',
    as: 'supplier',
});
Supplier.hasMany(Purchases, {
    foreignKey: 'supplierId',
    as: 'purchases',
});

// ~ Relación entre User y Sales...
User.hasMany(Sales, {
    foreignKey: 'userId',
    as: 'sales',
});
Sales.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

// ~ Relación entre User y Purchases...
User.hasMany(Purchases, {
    foreignKey: 'userId',
    as: 'purchases',
});
Purchases.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export {
    Employee,
    User,
    EmployeeStatus,
    Department,
    ProductInventory,
    Sales,
    Customer,
    SalesDetail,
    Purchases,
    Supplier,
    PurchaseDetail,
    Session,
    BlacklistedToken,
};
