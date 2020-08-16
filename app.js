const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const mongoose = require("mongoose");


// connect to database
mongoose.connect("mongodb://localhost:27017/protea", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("mongodb connection established");
});


// initialize app
const app = express();

const PORT = process.env.PORT || 3000;

// defining the middle wares
app.use(cors());

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//bring the passport authentication stregy
require("./config/passport")(passport);


app.get("/", (req, res) => {
  res.send({
    message: "This is Protea Backend",
  });
});


// bringing the user routes
const users=require("./routes/users");
app.use("/api/users",users);

// bringing the jobs routes
const users=require("./routes/jobs");
app.use("/api/jobs",jobs);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
