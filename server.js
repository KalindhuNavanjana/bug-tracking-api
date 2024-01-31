const express = require("express");
const { User } = require("./db/init");
const app = express();
require("./db/init");
const issuesRouter = require("./routes/issues");

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
