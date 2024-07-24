import mongoose, { HydratedDocument } from "mongoose";

interface ICv extends Document {
  cv_portuguese_url: string;
  cv_english_url: string;
}

const cvSchema = new mongoose.Schema<ICv>({
  cv_portuguese_url: {
    type: String
  },
  cv_english_url: {
    type: String
  }
});

export type Cv = HydratedDocument<typeof cvSchema>
export const cvModel = mongoose.model("Cv", cvSchema);
