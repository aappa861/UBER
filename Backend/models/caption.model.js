const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt'); // Uncomment if you need to hash passwords
const captionSchema = new mongoose.Schema({
    fullname:{
        firstname: {
            type: String,
            required: true,
            minlength:[3, 'first name must be at least 3 characters long']},
        
        lastname: {
            type: String,
           
            minlength:[3, 'last name must be at least 3 characters long'],
        }},
    email:{
            type:String,
            required:true,
            unique:true,
    
    },
    password:{
          type: String,
         required: true,
         select : false,
    },
    socketId: {
        type: String,
        

    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength:[3,'colormust be at least 3 charater long'],
        },
        plate: {
            type: String,
            required:true,
            minlength:[3,'colormust be at least 3 charater long'],

        },
        capacity: {
            type: Number,
            required:true,
            min:[1,'capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            required:true,
            enum:['car','motorcycle','Autorickshow'],
        },

    },
    location:{
        lat: {
            type: Number,
            
        },
        lng: {
            type: Number,
            
        }

    }
})
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
    
}
userSchema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password);
    
}
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
     
}
const captionModel = mongoose.model('Caption', captionSchema);

module.exports = captionModel;