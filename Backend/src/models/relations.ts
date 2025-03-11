import Employee from './employees/Employee';
import User from './users/User';
import EmployeeStatus from './employees/EmployeeStatus';
import Department from './employees/Department';
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

export {
    Employee,
    User,
    EmployeeStatus,
    Department,
    BlacklistedToken,
};
