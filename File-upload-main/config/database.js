const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () =>{

    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("Db connection successful"))
    .catch((error) =>{
        console.log("error issues");
        console.error(error);
        process.exit(1);
    });

}
