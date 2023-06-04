const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    typeOfUser :{ 
        type:String,
        required: true
    },
    name :{ 
        type:String,
        required: true
    },
    email : { 
        type:String,
        required: true
    },
    password : { 
        type:String,
        required: true
    },
    phone:{ 
        type:String,
        required: true
    },
    birthday:{ 
        type:String,
        required: true
    },
    wilaya:{ 
        type:String,
        required: true
    },
    daira:{ 
        type:String,
        required: true
    },
    baladia:{ 
        type:String,
        required: true
    },
    sport:{ 
        type:String,
        required: true
    },
    gender: {
        type:String,
        required: true
    },
    photoProfile : String,
    following : [String],
    followers : [String],
    notifications : [{
        id: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    }],
    nombreOfNotifications : Number
});

const User = mongoose.model('User', userSchema);

module.exports = { User };