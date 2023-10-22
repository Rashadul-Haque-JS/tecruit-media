const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const secretKey = 'techies'; 
// Create a default structure for your data
db.defaults({ applicants: [],jobs:[] }).write();

module.exports = {
    db,
    secretKey
};