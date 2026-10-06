import dns from "node:dns";
import mongoose from "mongoose";
import { DB_URI } from "../config/config.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const dbConnection = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
  }
};

export default dbConnection;
