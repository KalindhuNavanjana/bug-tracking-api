const express = require("express");
const { Issue, StatusHistory } = require("../db/init");
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

// Change the status of an existing issue
router.patch("/:id", async (req, res) => {
    const issueId = req.params.id;
    const { status } = req.body;

    try {
        //Update the status of the issue
        const issue = await Issue.findByPk(issueId);
        const updatedIssue = await issue.update({ status: status });

        //Create a new StatusUpdate record
        const newStatusUpdate = await StatusHistory.create({
            state: status,
            timestamp: new Date(),
            IssueId: issueId,
        });
        console.log(
            `The status of issue ${issueId} has been changed to ${status}`
        );
        res.json({updatedIssue, newStatusUpdate});
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

// GET all status updates for a specific issue
router.get("/:id/history", async (req, res) => {
    const issueId = req.params.id;

    try {
        const issue = await Issue.findByPk(issueId);
        const statusUpdates = await issue.getStatusHistories();
        statusUpdates.sort((a, b) => b.timestamp - a.timestamp)
        console.log(statusUpdates);
        res.json(statusUpdates);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
