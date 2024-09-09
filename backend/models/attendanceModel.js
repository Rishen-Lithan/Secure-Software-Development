const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const attendenceSchema = mongoose.Schema(
    {
    
        date:{
            type:String,
            required:true
        },
        name:{
            type:String,
            trim: true
        },
        attendance:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Employees"
         }
    },
    {
        timestamps:true,
    }
    
);

module.exports = mongoose.model("Attendece", attendenceSchema);