import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISchool extends Document {
  title: string;
  mobile: string;
  email: string;
  address: string;
  createdAt: Date;
}

const SchoolSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true, trim: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Avoid Re-compilation of Model in development
const School: Model<ISchool> =
  mongoose.models.School || mongoose.model<ISchool>("School", SchoolSchema);

export default School;
