const express = require("express");
const { Issue } = require("../db/init");
const router = express.Router();

// GET all issues
router.get("/", async (req, res) => {
    try {
        const issues = await Issue.findAll();
        res.json(issues);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// GET a specific issue
router.get("/:id", async (req, res) => {
    const issueId = req.params.id;

    try {
        const issue = await Issue.findByPk(issueId);
        res.json(issue);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// CREATE a new issue
router.post("/", async (req, res) => {
    const { title, description, type, status } = req.body;

    try {
        const newIssue = await Issue.create({
            title,
            description,
            type,
            status,
            userId: 1,
        });
        res.json(newIssue);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// UPDATE an existing issue
router.put("/:id", async (req, res) => {
    const issueId = req.params.id;
    
    try {
        const issue = await Issue.findByPk(issueId);
        const updatedIssue = await issue.update(req.body);
        res.json(updatedIssue);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// DELETE an issue
router.delete("/:id", async (req, res) => {
    const issueId = req.params.id;
    
    try {
        const issue = await Issue.findByPk(issueId);
        await issue.destroy();
        res.json({ message: `Issue ${issueId} has been deleted.` });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
