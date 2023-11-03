import express from "express";
import { createBus, getBuses } from "../controllers/bus.controller";
const busRouter = express.Router();

busRouter.post("/create", createBus);
busRouter.get("/get-buses", getBuses);
export default busRouter;
