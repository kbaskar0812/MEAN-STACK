const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CrudDB',(err) =>{
    if(!err)
        console.log('MongoDB connection successfull..');

    else
        console.log('connection failed: ' + JSON.stringify(err,undefined, 2))

});
module.exports = mongoose;
