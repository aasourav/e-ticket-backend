import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface IPassengers extends Document {
  name: string;
  phone: string;
  seatNumber: string;
}

const passengersSchema: Schema<IPassengers> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: String,
    required: true,
  },
});

export interface ITrip extends Document {
  busId: Types.ObjectId;
  from: Types.ObjectId;
  to: Types.ObjectId;
  departure_time: Date;
  passengers: IPassengers[];
}

const tripSchema: Schema<ITrip> = new mongoose.Schema({
  busId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  from: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  departure_time: {
    type: Date,
    required: true,
  },
  passengers: {
    type: [passengersSchema],
  },
});

const tripModel: Model<ITrip> = mongoose.model("trip", tripSchema);
export default tripModel;
