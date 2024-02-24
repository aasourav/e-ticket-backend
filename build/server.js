"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./utils/db");
const logger_1 = __importDefault(require("./utils/logger"));
dotenv_1.default.config();
app_1.app.listen(process.env.PORT, () => {
    // console.log("server is running on port ", process.env.PORT);
    logger_1.default.info(`server is : ${process.env.PORT} ${db_1.connectionString}`);
    (0, db_1.connectDb)();
});
//# sourceMappingURL=server.js.map