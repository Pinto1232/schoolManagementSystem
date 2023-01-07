const mongoose = require("mongoose");

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(process.env.DB, connectionParams)
        console.log("Connect to database successfully");
    } catch (error) {
        console.log(error);
        console.log("Could not connect to a database successfully");
    }
};
mongoose.set('strictQuery', true);
