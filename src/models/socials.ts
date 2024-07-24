
import mongoose, { HydratedDocument } from "mongoose";

interface ISocials extends Document {
  email: string,
  github: {
    title: string,
    url: string
  },
  linkedin: {
    title: string,
    url: string
  }
}

const socialsSchema = new mongoose.Schema<ISocials>({
  email: {
    type: String
  },
  github: {
    title: String,
    url: String
  },
  linkedin: {
    title: String,
    url: String
  }
});

export type Socials = HydratedDocument<typeof socialsSchema>
export const socialsModel = mongoose.model("Socials", socialsSchema);
