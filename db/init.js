const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("bug-tracking_development", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

// user class
const User = sequelize.define("User", {
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
});

// issue class
const Issue = sequelize.define("Issue", {
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    type: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "Open",
    },
});

// status hitory class
const StatusHistory = sequelize.define("StatusHistory", {
    state: {
        type: DataTypes.STRING,
    },
    timestamp: {
        type: DataTypes.DATE,
    },
});

// Define relationships
User.hasMany(Issue);
Issue.belongsTo(User);

Issue.hasMany(StatusHistory);
StatusHistory.belongsTo(Issue);

// Sync the models with the database
// sequelize.sync({ force: true });
sequelize.sync();

console.log(
    "The database has been created. Check MySQL Workbench for the tables."
);

module.exports = {
    User,
    Issue,
    StatusHistory,
    sequelize,
};
