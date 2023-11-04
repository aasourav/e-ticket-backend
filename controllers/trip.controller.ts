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

// change bus
export const changeTripBus = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldBusId, newBusId, tripId } = req.body;

      //is trip id is available
      const getTrip = await tripModel.findOne({ _id: tripId });
      if (!getTrip)
        return res
          .status(400)
          .json({ success: false, message: "Trip not found" });

      const selectedOldBusInfo = await busModel.findOne({
        _id: oldBusId,
      });
      if (!selectedOldBusInfo)
        return res
          .status(400)
          .json({ success: false, message: "Bus not found" });

      if (!selectedOldBusInfo.isAvailableForTrip)
        return res
          .status(400)
          .json({ success: false, message: "Bus is not fit" });

      if (selectedOldBusInfo.isTripBooked)
        return res
          .status(400)
          .json({ success: false, message: "Bus is already booked for trip" });

      await busModel.findByIdAndUpdate(
        { _id: oldBusId },
        { $set: { isTripBooked: false } }
      );

      const selectedNewBusInfo = await busModel.findOne({
        _id: newBusId,
      });
      if (!selectedNewBusInfo)
        return res
          .status(400)
          .json({ success: false, message: "New bus not found" });

      if (!selectedNewBusInfo.isAvailableForTrip)
        return res
          .status(400)
          .json({ success: false, message: "New bus is not fit" });

      if (selectedNewBusInfo.isTripBooked)
        return res.status(400).json({
          success: false,
          message: "New bus is already booked for trip",
        });

      await busModel.findByIdAndUpdate(
        { _id: newBusId },
        { $set: { isTripBooked: true } }
      );

      getTrip.busId = newBusId;
      getTrip.save();

      return res
        .status(200)
        .json({ success: true, message: "Bus has been changed" });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);

// booking seat
export const bookSeat = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tripId, passenger } = req.body;

      const getTrip = await tripModel.findOne({ _id: tripId });
      if (!getTrip)
        return res
          .status(400)
          .json({ success: false, message: "Trip not found" });
      getTrip.passengers = [...getTrip.passengers, passenger];
      getTrip.save();

      return res.status(200).json({ success: true, message: "Success" });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);

// delete trip
export const deleteTrip = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tripId } = req.body;
    try {
      const getTrip = await tripModel.findOne({ _id: tripId });
      if (!getTrip)
        return res.status(400).json({
          success: false,
          message: "Trip is not available",
        });

      const busId = getTrip.busId;
      await busModel.findOneAndUpdate(
        { _id: busId },
        { $set: { isAvailableForTrip: true } }
      );

      await tripModel.findOneAndDelete({ _id: tripId });

      return res
        .status(200)
        .json({ success: true, message: "Trip successfully removed" });
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
