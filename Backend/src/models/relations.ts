import Employee from './employees/Employee';
import User from './users/User';
import EmployeeStatus from './employees/EmployeeStatus';
import Department from './employees/Department';
import ProductInventory from './products/ProductInventory';
import Sales from './sales/Sales';
import SalesDetail from './sales/SalesDetail';
import Purchases from './purchases/Purchases';
import PurchaseDetail from './purchases/PurchaseDetail';
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
Sales.hasMany(SalesDetail, { foreignKey: 'salesId' });
SalesDetail.belongsTo(Sales, { foreignKey: 'salesId' });

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

export {
    Employee,
    User,
    EmployeeStatus,
    Department,
    ProductInventory,
    Sales,
    SalesDetail,
    Purchases,
    PurchaseDetail,
    BlacklistedToken,
};
