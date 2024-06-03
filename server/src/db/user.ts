import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: false },
  email: { type: String, required: false },
  phoneNumber: { type: Number, required: false },
  location: { type: String, required: false },
  profilePictureURL: { type: String, required: false },
  interests: [{ type: String }],
  skills: [{ type: String }],
  authentication: {
    password: { type: String, required: false, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUser = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
