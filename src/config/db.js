const mongoose = require("mongoose")



function connectToDB(){
    if (!process.env.MONGO_URI) {
        console.error("CRITICAL ERROR: MONGO_URI is not defined in your environment variables.");
        console.error("Please ensure your .env file exists in the root directory and contains MONGO_URI.");
        process.exit(1); 
    }
    mongoose.connect(process.env.MONGO_URI)


    .then(()=>{
        console.log("Server is connected to DB");
        
    })
    .catch(err=>{
        console.log("Error Connecting to DB")
        console.log(err);
        process.exit(1)
    })
}


module.exports = connectToDB;