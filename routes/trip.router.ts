import express from "express";
import {
  bookSeat,
  updateTrip,
  confirmTrip,
  createTrip,
  deleteTrip,
  getAllTrips,
  getPassengers,
  getTrips,
} from "../controllers/trip.controller";
// import { isAuthenticated } from "../middleware/auth";

const tripRouter = express.Router();

tripRouter.post("/create", createTrip);
tripRouter.put("/update", createTrip);
tripRouter.put("/update-trip/:tripId", updateTrip);
tripRouter.delete("/delete/:tripId", deleteTrip);
tripRouter.get("/get-passengers", getPassengers);
tripRouter.put("/book-seat", bookSeat);
tripRouter.get("/trip-list/from/:from/to/:to", getTrips);
tripRouter.get("/get-all-trips", getAllTrips);
tripRouter.post("/confirm-trip", confirmTrip);
export default tripRouter;
