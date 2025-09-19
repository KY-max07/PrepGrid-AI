const mongoose = require("mongoose");

require('dotenv').config();

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
        });
        console.log("connected sucessfully!!! => MongoDB");
        
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB; 