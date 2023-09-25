const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, password, email, confirmPassword } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (er) {
    next(er);
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const emailCheck = await User.findOne({ email });

    if (emailCheck)
      if (bcrypt.compare(emailCheck.password, password)) {
        return res.json({
          msg: "Login Succesfull",
          user: emailCheck,
          status: true,
        });
      } else {
        return res.json({ msg: "Wrong Credentials", status: false });
    }
    else {
        return res.json({ msg: "No users of that credential", status: false });
        
    }
  } catch (er) {
    next(er);
  }
};
module.exports.setAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(id, {
      avatarImage,
      isAwatarImageSet: true,
    });
    return res.json({
      isSet: userData.isAwatarImageSet,
      image: userData.avatarImage,
    });


  } catch (er) {
    next(er);
  }
};
module.exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ]);
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  };
