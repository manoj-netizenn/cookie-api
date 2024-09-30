const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const users = [
  { username: "john", password: "123", role: "admin" },
  { username: "Sarah", password: "456", role: "user" },
];

//Home Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.post("/login", (req, res) => {
  const userFound = users.find((user) => {
    const { username, password } = req.body;
    return user.username === username && user.password === password;
  });
  res.cookie("userData", JSON.stringify(userFound), {
    maxAge: 3 * 24 * 60 * 1000, //3days expiration
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  if (userFound) {
    res.json({
      message: "Login Success",
    });
  } else {
    res.json({
      message: "Login Failed",
    });
  }
});

//Dashboard Route
app.get("/dashboard", (req, res) => {
  const userData = req.cookies.userData
    ? JSON.parse(req.cookies.userData)
    : null;
  const username = userData ? userData.username : null;
  if (username) {
    res.json({
      message: `Welcome ${username}, role: ${userData.role}`,
    });
  } else {
    res.json({
      message: "Unauthorized please login first",
    });
  }
});

//Logout Route
app.get("/logout", (req, res) => {
 // res.clearCookie("userData");
  res.json({
    message: "logged out successfully",
  });
});

app.listen(3000, console.log("the server is running"));

