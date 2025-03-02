import { Schema } from 'mongoose';

const notificationSchema = new Schema({
  hospitalId: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
  },
  notifications: {
    type: [String],
    default: [],
  },
});

export { notificationSchema };
