
import mongoose, { HydratedDocument } from "mongoose";

interface ICategory extends Document {
  name: String;
}

const categorySchema = new mongoose.Schema<ICategory>({
  name: {
   "pt-BR": String,
   "en-US": String
  } 
});

export type Category = HydratedDocument<typeof categorySchema>
export const categoryModel = mongoose.model("Category", categorySchema);
