const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Create a default structure for your data
db.defaults({ users: [],jobs:[] }).write();

module.exports = db;