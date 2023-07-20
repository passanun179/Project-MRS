const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./users.models");
db.role = require("./role.models");

db.ROLES = ["user", "admin"];

module.exports = db;