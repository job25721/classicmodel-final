const express = require('express')
const app = express();



require('./routes/pages')(app); //pages routes


//serve static css bootstrap
app.use(express.static('style'))




app.listen(3000,(err)=>{
    if(err) throw err;
    console.log("listen on ");
    console.log("http://localhost:3000");
})