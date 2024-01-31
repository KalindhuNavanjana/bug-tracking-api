"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Issues",
            [
                {
                    title: "Bug 1",
                    description: "Description of Bug 1",
                    type: "Bug",
                    status: "Open",
                    UserId: 1, // Associate with user id 1
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: "Question 1",
                    description: "Description of Question 1",
                    type: "Question",
                    status: "In Progress",
                    UserId: 2, // Associate with user id 2
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // Add more issues as needed
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Issues", null, {});
    },
};
