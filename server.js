import "dotenv/config";
import { app } from "./src/index.js";
import { connectDB } from "./src/db/db.js";

const PORT = 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
