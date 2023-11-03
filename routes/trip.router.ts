import express from "express";
import { createTrip, getTrips } from "../controllers/trip.controller";
// import { isAuthenticated } from "../middleware/auth";

const tripRouter = express.Router();

tripRouter.post("/create", createTrip);
tripRouter.get("/trip-list", getTrips);
export default tripRouter;
