const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const items = require("./routes/api/items");

const app = express();

app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//Use routes
app.use("/api/items", items);

//server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = 5000; //process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
