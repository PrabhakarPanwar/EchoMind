import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("DB Connected"));
    await mongoose.connect(`${process.env.MONGO_URL}/echomind`);
  } catch (error) {
    console.log(error.message);
  }
};
export default connect;
