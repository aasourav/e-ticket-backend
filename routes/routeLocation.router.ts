import express from "express";
import {
  createRoute,
  getRoutes,
  updateRoute,
} from "../controllers/route.controller";
// import { isAuthenticated } from "../middleware/auth";

const routeRouter = express.Router();

routeRouter.post("/create", createRoute);
routeRouter.put("/update", updateRoute);
routeRouter.put("/delete", updateRoute);
routeRouter.get("/route-list", getRoutes);
export default routeRouter;
