import express from "express";
import {
  createBus,
  deleteBus,
  getBuses,
  toggleBusIsAvailableForTrip,
  updateBus,
} from "../controllers/bus.controller";
const busRouter = express.Router();

busRouter.post("/create", createBus);
busRouter.put("/toggle-available", toggleBusIsAvailableForTrip);
busRouter.put("/update", updateBus);
busRouter.delete("/delete", deleteBus);
busRouter.get("/get-buses", getBuses);
export default busRouter;
