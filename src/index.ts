import express from "express";
import locationRoutes from "./routes/locationRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import shiftRoutes from "./routes/shiftRoutes";
import visitRoutes from "./routes/visitRoutes";

const app = express();

app.use(express.json());

app.use("/locations", locationRoutes);
app.use("/employees", employeeRoutes);
app.use("/shifts", shiftRoutes);
app.use("/visits", visitRoutes);

app.get("/", (req, res) => {
  res.send("Anticafe Backend API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
