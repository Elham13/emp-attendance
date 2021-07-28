import mongoose from "mongoose";

const connection = {};

const dbConnect = async () => {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log(
    `Mongodb connected at ${db.connection.host} ${connection.isConnected}`
  );
};

export default dbConnect;
