import express from "express";
import { createRoute, getRoutes } from "../controllers/route.controller";
// import { isAuthenticated } from "../middleware/auth";

const routeRouter = express.Router();

routeRouter.post("/create", createRoute);
routeRouter.get("/route-list", getRoutes);
export default routeRouter;
