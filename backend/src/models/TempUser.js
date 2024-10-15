const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    verificationCode: String, 
});

const TempUser = mongoose.model('TempUser', tempUserSchema);

module.exports = TempUser;
