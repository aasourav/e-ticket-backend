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
exports.connectDb = exports.connectionString = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
require("dotenv").config();
// const DB_URL: string = process.env.DB_URL || "";
// const DB_USERNAME = process.env.DB_USERNAME || "";
// const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_USERNAME = "test";
const DB_PASSWORD = "test";
const DB_HOST = "mongo"; // Your MongoDB container hostname
const DB_PORT = "2707"; // Your MongoDB container port
// Construct the connection URL
exports.connectionString = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/`;
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default
            // .connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}`)
            .connect(exports.connectionString)
            .then(() => {
            logger_1.default.info(`MongoDB connected.`);
        });
    }
    catch (err) {
        logger_1.default.error(exports.connectionString);
        console.log("OHHHH: ", exports.connectionString);
        setTimeout(() => exports.connectDb, 5000);
    }
});
exports.connectDb = connectDb;
//# sourceMappingURL=db.js.map