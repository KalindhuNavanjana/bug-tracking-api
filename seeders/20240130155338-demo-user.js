"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    firstName: "Kalindu",
                    lastName: "Navanjana",
                    email: "KalindhuNavanjana@gmail.com",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "John",
                    lastName: "Doe",
                    email: "john.doe@example.com",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Jane",
                    lastName: "Doe",
                    email: "jane.doe@example.com",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // Add more users as needed
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
