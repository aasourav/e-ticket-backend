import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import routeLocationModel from "../models/routeLocatoin.mode";
import ErrorHandler from "../utils/ErrorHandler";
import tripModel from "../models/trip.model";

// export const getRoutes = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//     } catch (err: any) {
//       return next(new ErrorHandler(err.message, 400));
//     }
//   }
// );

interface ILocationName {
  name: string;
}
export const createRoute = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body as ILocationName;
      const newRoute = await routeLocationModel.create({ locationName: name });
      return res.status(201).json({ success: true, newRoute });
    } catch (err) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);

export const updateRoute = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { routeId, updatedName } = req.body;

      //is available the route
      const getRoute = await routeLocationModel.findOne({ _id: routeId });
      if (!getRoute) {
        return res
          .status(400)
          .json({ success: false, message: "Route not found" });
      }

      getRoute.locationName = updatedName;
      getRoute.save();

      return res
        .status(200)
        .json({ success: true, message: "Successfully updated" });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);

export const deleteRoute = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { routeId } = req.body;

      // is this route is available
      const getRoute = await routeLocationModel.findOne({ _id: routeId });
      if (!getRoute) {
        return res
          .status(400)
          .json({ success: false, message: "Route not found" });
      }

      // is this route is selected for trip
      const getTrip = await tripModel.findOne({
        $or: [{ from: routeId }, { to: routeId }],
      });

      if (!!getTrip)
        return res.status(400).json({
          success: false,
          message: "This location is already is in used for trip",
        });

      // delete the route
      await routeLocationModel.deleteOne({ _id: routeId });

      return res.status(200).json({
        success: true,
        message: "Successfully deleted",
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);

export const getRoutes = CatchAsyncError(
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const getRoutes = await routeLocationModel.find();
      res.status(200).json({ success: true, getRoutes });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);

export const getRoute = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { routeName } = req.params;
      const getRoutes = await routeLocationModel.find({
        locationName: { $regex: routeName, $options: "i" },
      });
      res.status(200).json({ success: true, getRoutes });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);
