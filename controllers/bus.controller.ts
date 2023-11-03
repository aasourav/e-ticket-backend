// export const getRoutes = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//     } catch (err: any) {
//       return next(new ErrorHandler(err.message, 400));
//     }
//   }
// );

import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import busModel, { IBusDetails } from "../models/bus.model";

export const createBus = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { busName, busType, numberOfSeat } = req.body as IBusDetails;

      const createdBus = await busModel.create({
        busName,
        busType,
        numberOfSeat,
      });

      res.status(201).json({ success: true, createdBus });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);

export const getBuses = CatchAsyncError(
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const getBuses = await busModel.find();
      return res.status(200).json({ success: true, getBuses });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);
