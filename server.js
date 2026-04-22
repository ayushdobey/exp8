const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const SECRET_KEY = "mysecretkey";

// Sample users database
const users = [
  { email: "abc@gmail.com", mobile: "+919876543210" },
  { email: "xyz@gmail.com", mobile: "+919123456789" }
];

app.post("/validate", (req, res) => {

  const { email, mobile } = req.body;

  // Step 1: Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      message: "Invalid Email Format"
    });
  }


  // Step 2: Check if number starts with +91 (string manipulation)
  if (!mobile.startsWith("+91")) {
    return res.status(400).json({
      message: "Mobile must start with +91 (Indian Number)"
    });
  }


  // Step 3: Extract digits after +91
  const numberPart = mobile.substring(3);

  // Step 4: Check length uniqueness (Indian number = 10 digits)
  if (numberPart.length !== 10) {
    return res.status(400).json({
      message: "Indian number must contain exactly 10 digits after +91"
    });
  }


  // Step 5: Ensure digits only
  if (!/^[6-9]\d{9}$/.test(numberPart)) {
    return res.status(400).json({
      message: "Invalid Indian Mobile Number"
    });
  }


  // Step 6: Match with database
  const user = users.find(
    u => u.email === email && u.mobile === mobile
  );


  // Step 7: Generate token if valid
  if (user) {

    const token = jwt.sign(
      { email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Valid User",
      token: token
    });

  } else {

    return res.status(401).json({
      message: "User Not Found"
    });

  }

});


// Middleware to verify JWT
function verifyToken(req, res, next) {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send("Token Required");
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {

    if (err) {
      return res.status(401).send("Invalid Token");
    }

    req.user = decoded;
    next();

  });

}


// Protected dashboard route
app.get("/dashboard", verifyToken, (req, res) => {

  res.send("Welcome to My Dashboard");

});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});