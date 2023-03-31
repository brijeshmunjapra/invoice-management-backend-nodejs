const User = require("../../models/user");
var bcrypt = require("bcryptjs");

module.exports.registerData = async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const {
      name,
      email,
      password,
      address,
      phoneNumber,
      gstNumber,
      gstValue,
      cgstValue,
      sgstValue,
    } = req.body;

    // Validate user input
    if (!(email && password && name)) {
      return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
      token: "",
    });

    // return new user
    return res.status(201).json(user);
  } catch (err) {
    if (err) {
      if (err.name === "MongoServerError" && err.code === 11000) {
        return res.status(422).send("User already exist!");
      } else {
        return res.status(422).send(err);
      }
    }
  }
};

module.exports.updateUserPassword = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  encryptedPassword = await bcrypt.hash(req.body.password, 10);

  req.body.password = encryptedPassword;

  await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({ message: "User data updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

module.exports.updateUserData = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  // encryptedPassword = await bcrypt.hash(req.body.password, 10);

  // req.body.password = encryptedPassword;

  await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({ message: "User data updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
