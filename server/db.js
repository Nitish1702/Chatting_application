const mongoose = require("mongoose");

module.exports = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology:true
    }
    try {
        await mongoose.connect(process.env.DB, mongoose.connectionParams);


    }
    catch (err) {

    }
}