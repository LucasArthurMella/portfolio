
import mongoose, { HydratedDocument } from "mongoose";

interface ITechnology extends Document {
  name: string;
  image_url: string;
}

const technologySchema = new mongoose.Schema<ITechnology>({
  name: {
    type: String
  },
  image_url: {
    type: String
  }
});

export type Technology = HydratedDocument<typeof technologySchema>
export const technologyModel = mongoose.model("Technology", technologySchema);
