const mongoose = require("mongoose");
const Project = require("../models/project");
mongoose.set('strictQuery', false);
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

const seedProjects = [
  {
    name: "Project1",
    subVendor: "Vendor01",
    startDate: "2023-01-23",
    endDate: "2023-02-25",
    amount: 3000,
    paidAmount: 1200,
    status: false,
  },
  {
    name: "Project2",
    subVendor: "Vendor02",
    startDate: "2023-01-23",
    endDate: "2023-02-25",
    amount: 5000,
    paidAmount: 2000,
    status: false,
  },
  {
    name: "Project3",
    subVendor: "Vendor03",
    startDate: "2023-01-23",
    endDate: "2023-02-25",
    amount: 10000,
    paidAmount: 8000,
    status: false,
  },
];


  Project.insertMany(seedProjects)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });



