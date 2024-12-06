import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is Running at port ${process.env.PORT}`);
    });
    app.on("Error", (error) => {
      console.log(`Error is: ${error}`);
      throw error;
    });
  })
  .catch((err) => {
    console.log(`MongoDB Connetion Failed . Error: ${err}`);
  });
