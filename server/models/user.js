const moongose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new moongose.Schema({
    cities:[String]
})


userSchema.plugin(passportLocalMongoose);

module.exports = moongose.model("User" , userSchema);