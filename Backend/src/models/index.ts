import { Sequelize } from 'sequelize';
import {
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
    BlacklistedToken,
} from './relations';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    },
);

const models = {
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
    BlacklistedToken,
    sequelize,
};

export default models;
