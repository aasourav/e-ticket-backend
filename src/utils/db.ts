import mongoose from "mongoose";
import logger from "./logger";

require("dotenv").config();

// const DB_URL: string = process.env.DB_URL || "";
const DB_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || "";
const DB_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD || "";

const DB_PORT = "27017"; // Your MongoDB container port
const DB_HOST = "mongo";
const DB_NAME = "eticket";

// Construct the connection URL
export const connectDb = async () => {
  try {
    await mongoose
      .connect(
        `mongodb://${DB_USERNAME}:${DB_PASSWORD}@mongodb:27017/eticket?authSource=admin`
      )
      // .connect(`mongodb://mongo:${DB_PORT}`, {
      //   pass: DB_PASSWORD,
      //   user: DB_USERNAME,
      //   authSource: "eticket",
      //   dbName: "eticket",

      // })
      .then(() => {
        logger.info(`MongoDB connected.`);
      });
  } catch (err: any) {
    logger.error(err.message);
    setTimeout(() => connectDb, 5000);
  }
};
