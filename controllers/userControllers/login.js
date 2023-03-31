const User = require("../../models/user");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const secretKey = "This is secret key";

module.exports = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    console.log(user, "first");
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      console.log(user, "second");

      const token = jwt.sign({ user_id: user._id, email }, secretKey, {
        expiresIn: "2h",
      });

      console.log(token, "token");

      // save user token
      user.token = token;
      await user.save();

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    return res.status(422).send(err);
  }
};
