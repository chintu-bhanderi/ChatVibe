const express = require('express')
const app = express();   // express appication..

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('This is backend');
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});








