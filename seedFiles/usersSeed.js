const mongoose = require("mongoose");
const User = require("../models/user");

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

const seedUsers = [
  {
    name: "Ivory001",
    email: "ivory001@gmail.com",
    password: "Ivory@001",
    address:
      "202/Satyamev Eminence, Science City Road, Ahmedabad, Gujarat, India - 380060",
    phoneNumber: "923747XXXX",
    gstNumber: "GSTABCXYZ001",
    gstValue: 18,
    cgstValue: 9,
    sgstValue: 9,
    token: "",
  },
];

User.insertMany(seedUsers)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
