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
import routeLocationModel from "../models/routeLocatoin.mode";

export const createTrip = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { busId, fromId, toId, departure_time, price } = req.body as ITrip;

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

      // check from  and to is available
      const getFrom = await routeLocationModel.findOne({ _id: fromId });
      const getTo = await routeLocationModel.findOne({ _id: toId });

      if (!getFrom || !getTo) {
        return res
          .status(400)
          .json({ success: false, message: "Route not found" });
      }

      const createdBus = await tripModel.create({
        busId,
        fromId,
        toId,
        busName: selectedBusInfo.busName,
        from: getFrom.locationName,
        to: getTo.locationName,
        busType: selectedBusInfo.busType,
        price,
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
      const { newBusId, tripId } = req.body;

      //is trip id is available
      const getTrip = await tripModel.findOne({ _id: tripId });
      if (!getTrip)
        return res
          .status(400)
          .json({ success: false, message: "Trip not found" });

      const selectedOldBusInfo = await busModel.findOne({
        _id: getTrip.busId,
      });
      if (!selectedOldBusInfo)
        return res
          .status(400)
          .json({ success: false, message: "Bus not found" });

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

      await busModel.findByIdAndUpdate(
        { _id: getTrip.busId },
        { $set: { isTripBooked: false } }
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

//get booked seat info
export const getPassengers = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tripId } = req.body;
      const tripInfo = await tripModel.findOne({ _id: tripId });
      if (!tripInfo)
        return res
          .status(400)
          .json({ success: false, message: "Trip not found" });

      return res
        .status(200)
        .json({ success: true, passengers: tripInfo.passengers });
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { from, to } = req.params as { from: string; to: string };

      const getTrips = await tripModel.find({
        from: from.toLocaleLowerCase(),
        to: to.toLocaleLowerCase(),
      });

      if (!getTrips.length)
        return res
          .status(400)
          .json({ success: true, message: "Trip not found" });

      return res.status(200).json(getTrips);
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);
