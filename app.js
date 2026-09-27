const express = require("express");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = 3000;


app.use(express.json());


app.use(logger);


app.use("/students", studentRoutes);


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


app.use((err, req, res, next) => {
  
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON" });
  }

  console.log(err);
  res.status(500).json({ message: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
