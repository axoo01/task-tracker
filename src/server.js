import dotenv from "dotenv";
import app from "./app.js";

// Load our environment variables from the .env file
dotenv.config();

// Fallback to port 3000 if the environment file doesn't define one
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
