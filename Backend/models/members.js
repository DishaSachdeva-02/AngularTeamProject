const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    name: String,

    member_id:Number

})

 

module.exports = mongoose.model('Member',userSchema);

