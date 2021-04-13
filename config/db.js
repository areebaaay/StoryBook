const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        //process.env allows to access variables in config/config.env
        const conn = await mongoose.connect(process.env.MONGO_URI , {
            // helps to remove errors from console
            useNewUrlParser: true,
            useUnifiedTopology : true,
            useFindAndModify : false
            
        })
        console.log(`MONGO DB Connected : ${conn.connection.host}`)
    }
    catch(err)
    {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB