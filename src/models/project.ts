
import mongoose, { HydratedDocument } from "mongoose";
import { Category } from "./category";

interface IProject extends Document {
  pictures: string[];
  link: string;
  demonstrativeLink: string;
  repository: string;
  name: {
    "pt-BR": string;
    "en-US": string;
  }
  description: {
    "pt-BR": string;
    "en-US": string;
  },
  categories: Category[] | mongoose.ObjectId; 
}

const projectSchema = new mongoose.Schema<IProject>({
  pictures: {type: [String]},
  link: {type: String},
  demonstrativeLink: {type: String},
  repository: {type: String},
  name: {
    "pt-BR": {type: String},
    "en-US": {type: String}
  },
  description: {
    "pt-BR": {type: String},
    "en-US": {type: String}
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category"}]
});

export type Project = HydratedDocument<typeof projectSchema>
export const projectModel = mongoose.model("Project", projectSchema);
