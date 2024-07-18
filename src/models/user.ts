import mongoose, { HydratedDocument } from "mongoose";

interface IUser extends Document {
  email: string;
  hash: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String
  },
  hash: {
    type: String
  }
});

export type User = HydratedDocument<typeof userSchema>
export const userModel = mongoose.model("User", userSchema);
