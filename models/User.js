const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide Name"],
        minlength: 3,
        maxlegth: 50,
    },
    email: {
        type: String,
        required: [true, "Please Provide Email"],
        validate: { validator: validator.isEmail },
        message: `Please Provide valid Email`,
    },

    password: {
        type: String,
        required: [true, "Please Provide Password"]
    },

});

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});



UserSchema.methods.createToken = async function () {
    return jwt.sign({ userId: this._id, username: this.name }, process.env.SECRET_KEy, { expiresIn: process.env.JWT_LIFETIME });

}


UserSchema.methods.comparePasswords = function (candidatePassword) {
    const isMatch = bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}
module.exports = mongoose.model("user", UserSchema);