"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.userRouter = exports.employeeRouter = void 0;
var employee_routes_1 = require("./employees/employee.routes");
Object.defineProperty(exports, "employeeRouter", { enumerable: true, get: function () { return employee_routes_1.employeeRouter; } });
var user_routes_1 = require("./users/user.routes");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return user_routes_1.userRouter; } });
var auth_routes_1 = require("./auth/auth.routes");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return auth_routes_1.authRouter; } });
//# sourceMappingURL=index.js.map