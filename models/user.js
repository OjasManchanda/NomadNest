const moongose = require("mongoose");
const Schema = moongose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    //username and password will be added by passport-local-mongoose automatically
});

userSchema.plugin(passportLocalMongoose);
module.exports = moongose.model("User", userSchema);