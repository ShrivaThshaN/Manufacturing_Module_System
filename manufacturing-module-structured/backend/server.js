const express = require("express");
const cors = require("cors");
const mpsRoutes = require("./routes/mps");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/mps", mpsRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));