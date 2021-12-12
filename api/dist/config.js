"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const ormConfig_1 = __importDefault(require("./ormConfig"));
exports.default = {
    app: {
        port: parseInt(process_1.env.APP_PORT || '8000') || 8000,
    },
    database: ormConfig_1.default
};
//# sourceMappingURL=config.js.map