import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import routeLocationModel from "../models/routeLocatoin.mode";
import ErrorHandler from "../utils/ErrorHandler";

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
      res.status(201).json({ success: true, newRoute });
    } catch (err) {
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
