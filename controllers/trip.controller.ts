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
import tripModel, { ITrip } from "../models/trip.model";
import busModel from "../models/bus.model";

export const createTrip = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { busId, from, to, departure_time } = req.body as ITrip;

      // check is bus is free for trip and is fit
      const selectedBusInfo = await busModel.findOne({
        _id: busId,
      });
      if (!selectedBusInfo)
        return res
          .status(400)
          .json({ success: false, message: "Bus not found" });

      if (!selectedBusInfo.isAvailableForTrip)
        return res
          .status(400)
          .json({ success: false, message: "Bus is not fit" });

      if (selectedBusInfo.isTripBooked)
        return res
          .status(400)
          .json({ success: false, message: "Bus is already booked for trip" });

      const createdBus = await tripModel.create({
        busId,
        from,
        to,
        departure_time,
      });

      await busModel.findByIdAndUpdate(
        { _id: busId },
        { $set: { isTripBooked: true } }
      );

      res.status(201).json({ success: true, createdBus });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);

export const getTrips = CatchAsyncError(
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const getTrips = await tripModel.find();
      return res.status(200).json({ success: true, getTrips });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);
