const mongoose = require("mongoose");
const Invoice = require("../models/invoice");

mongoose.set("strictQuery", true);




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



const seedInvoices = [
  {
    invoiceNo: "ITPL/001",
    date: "01-01-2023",
    vendor: "Vendor1",
    projects: ["Project1", "Project4"],
    invoiceAmounts: [1000, 5000],
    totalAmount: 6000,
  },
];



Invoice.insertMany(seedInvoices)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });


