"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRES_IN = exports.JWT_SECRET = void 0;
exports.JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key';
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
//# sourceMappingURL=auth.js.map