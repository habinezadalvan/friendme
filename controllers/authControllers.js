import validator from "validator";
import moment from "moment";
import User from "../models/userModel.js";
import Info from "../models/userInfoModel.js";
import { databaseErrorHandlingFunction } from "../helpers/dbErrorsHandlerHelper.js";
import { createToken } from "../helpers/createToken.js";
import { createCsrfToken } from "../utils/createCsrfToken.js";

const maxAge = 2 * 24 * 60 * 60;

export const signUp = async (req, res) => {
  const { username, email, password, dateOfBirth } = req.body;

  const userDateOfBirth = new Date(dateOfBirth);
  const todayDate = moment(Date.now());
  const userAge = todayDate.diff(userDateOfBirth, "years", true).toFixed(1);
  try {
    const user = await User.create({
      username,
      email,
      password,
      dateOfBirth: moment(dateOfBirth),
      age: userAge,
    });

    if (user) {
      const token = await createToken(user._id, maxAge);
      const csrfToken = createCsrfToken();
      req.session.token = token;
      req.session.csrfToken = csrfToken;
      const { password, ...rest } = user._doc;
      await Info.create({ userId: user._id });

      return res.status(201).json({ user: { ...rest, csrfToken } });
    }
  } catch (error) {
    const errors = databaseErrorHandlingFunction(error);
    return res.status(400).json(errors);
  }
};

export const logIn = async (req, res) => {
  const { password, username } = req.body;
  const userCridentials = {
    email: "",
    username: "",
    password,
  };

  validator.isEmail(username)
    ? (userCridentials.email = username)
    : (userCridentials.username = username);

  try {
    const user = await User.login(userCridentials);
    if(!user) return res.status(400).json({message: 'Incorrect username, email or password.'})
    const { password, ...rest } = user._doc;
    const token = await createToken(user._id, maxAge);
    const csrfToken = createCsrfToken();
    req.session.token = token;
    req.session.csrfToken = csrfToken;

    return res.status(200).json({ user: { ...rest, csrfToken } });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const logOut = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) return res.status(400).json({ error: "Something went wrong." });
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: `You are logged out.` });
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
