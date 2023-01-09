const mongoose = require('mongoose');


const databaseConnect = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(()=>{
        console.log('Mongodb Database Connected')
    }).catch(err=>{
        console.log(err);
    })
}
module.exports = databaseConnect