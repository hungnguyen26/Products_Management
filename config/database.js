const mongoose = require('mongoose');

module.exports.connect = async ()=>{
    try {
       await  mongoose.connect(process.env.MONGODB_URL);
       console.log("Connect Succsess");
    } catch (error) {
       console.log("Connect Error");
    }
}
