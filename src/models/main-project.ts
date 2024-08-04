import mongoose, { HydratedDocument } from "mongoose";
import { Project } from "./project";

interface IMainProject extends Document {
  project: Project | string ;
}

const mainProjectSchema = new mongoose.Schema<IMainProject>({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project"}
});

export type MainProject = HydratedDocument<typeof mainProjectSchema>
export const mainProjectModel = mongoose.model("MainProject", mainProjectSchema);
