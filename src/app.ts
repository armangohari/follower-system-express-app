import express from "express";
import followRoutes from "./routes/followRoutes";
import { setupSwagger } from "./swagger";

const app = express();

app.use(express.json());
app.use("/api", followRoutes);

// Set up Swagger
setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
