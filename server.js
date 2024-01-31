require("dotenv").config();
const express = require("express");
const { User } = require("./db/init");
const app = express();
require("./db/init");
const issuesRouter = require("./routes/issues");

//CORS middleware to allow requests from specific origins
app.use(accessControl);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Your Express routes go here
app.use("/issues", issuesRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`);
});

//Middleware
function accessControl(req, res, next) {
    const allowedOrigins = [
      `${process.env.FRONTEND_URL}`, // Frontend origin
    ];
  
    const origin = req.headers.origin;
  
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.header("Access-Control-Allow-Credentials", true); // Allow sending cookies and credentials
  
    // Handle preflight requests
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  }