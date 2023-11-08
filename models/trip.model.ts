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
  fromId: Types.ObjectId;
  toId: Types.ObjectId;
  busName: string;
  from: string;
  to: string;
  price: string;
  busType: string;
  departure_time: Date;
  passengers: IPassengers[];
}

const tripSchema: Schema<ITrip> = new mongoose.Schema({
  busId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  fromId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  toId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  busName: {
    type: String,
    required: true,
  },
  departure_time: {
    type: Date,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  busType: {
    type: String,
    required: true,
  },
  passengers: {
    type: [passengersSchema],
  },
});

const tripModel: Model<ITrip> = mongoose.model("trip", tripSchema);
export default tripModel;
