const mongoose = require('mongoose');

//Cria uma conexão com o mongoose, que gerencia os esquemas e suas validações
const connectDB = async ()=>{
  const conn = await mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;