const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());

const mongoose = require("mongoose");
const usersRoutes = require("./routes/usersRoutes");
const vendorsRoutes = require("./routes/vendorsRoutes");
const projectRoutes = require("./routes/projectRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://brijesh:G5rSBQ5vkSH1mV3N@cluster0.ozbvkso.mongodb.net/invoiceDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/", usersRoutes);
app.use("/", vendorsRoutes);
app.use("/", projectRoutes);
app.use("/", invoiceRoutes);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
