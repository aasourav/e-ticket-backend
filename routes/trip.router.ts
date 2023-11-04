import express from "express";
import {
  bookSeat,
  changeTripBus,
  createTrip,
  deleteTrip,
  getPassengers,
  getTrips,
} from "../controllers/trip.controller";
// import { isAuthenticated } from "../middleware/auth";

const tripRouter = express.Router();

tripRouter.post("/create", createTrip);
tripRouter.put("/update", createTrip);
tripRouter.put("/change-trip", changeTripBus);
tripRouter.delete("/delete", deleteTrip);
tripRouter.get("/get-passengers", getPassengers);
tripRouter.put("/book-seat", bookSeat);
tripRouter.get("/trip-list", getTrips);
export default tripRouter;
