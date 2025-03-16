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
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const csrf_1 = __importDefault(require("csrf"));
const dotenv_1 = __importDefault(require("dotenv"));
const synchronicityDB_1 = __importDefault(require("./config/synchronicityDB"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = require("./routes/index");
const auth_1 = require("./config/auth");
const app = (0, express_1.default)();
dotenv_1.default.config();
// ~ Settings...
app.set('port', process.env.PORT || 8585 || 3070);
// ~  Configuración de CSRF...
const csrfProtection = new csrf_1.default();
// ~ Middlewares...
app.use((req, res, next) => {
    const csrfToken = csrfProtection.create(auth_1.JWT_SECRET);
    res.cookie('XSRF-TOKEN', csrfToken, { httpOnly: true });
    res.locals.csrfToken = csrfToken;
    next();
}); // > Middleware para generar tokens CSRF
//
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
// app.use(errorHandler);
// * Iniciando la DB...
const initializeDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // > Sincroniza la DB...
        yield (0, synchronicityDB_1.default)();
        console.log('Database synchronized successfully.');
    }
    catch (error) {
        console.error('Error synchronizing database:', error);
        process.exit(1); // > Salir con error si la sincronización falla...
    }
});
//
initializeDB();
// ? Ruta de testeo...
app.get('/api', (req, res) => {
    res.json({ message: 'Api working...!!!' });
});
// * Routes...
app.use('/api/auth', index_1.authRouter);
app.use('/api/employees', index_1.employeeRouter);
app.use('/api/users', index_1.userRouter);
app.use('/api/suppliers', index_1.supplierRouter);
app.use('/api/customers', index_1.customerRouter);
app.use('/api/purchases', index_1.purchaseRouter);
exports.default = app;
//# sourceMappingURL=app.js.map