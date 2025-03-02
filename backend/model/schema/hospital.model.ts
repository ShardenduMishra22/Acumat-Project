import { Schema } from 'mongoose';
import { IHospital } from '../Type/data.type';

export const hospitalSchema: Schema<IHospital> = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    phoneNumber: {
      type: Number,
      required: [true, 'Phone number is required'],
      match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    cases: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Case',
      },
    ],
    role: {
      type: String,
      enum: ['Hospital'],
      default: 'Hospital',
    },
  },
  { timestamps: true }
);
