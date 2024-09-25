const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:true
        },
        category:{
            type: String,
            required:true
        },
        date:{
            type: String,
            required:true
        },
        rquantity:{
            type: String,
            required:true
        },
        uquantity:{
            type: String,
            required:true
        },
        totalPrice:{
            type: String,
            required:true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Products", inventorySchema);