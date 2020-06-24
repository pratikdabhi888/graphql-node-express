const mongoose = require('mongoose')

const connectDb = async () => {
   const conn = await  mongoose.connect(process.env.MONGODB_CONNECT,{
       useNewUrlParser:true,
       useCreateIndex:true,
       useFindAndModify:false,
       useUnifiedTopology: true
   });
   console.log(`MongoDB connected: ${conn.connection.host}`)
}

module.exports = connectDb;