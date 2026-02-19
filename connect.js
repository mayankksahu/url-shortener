const mongoose=require('mongoose');


// mongoose.connect('mongodb://127.0.0.1:27017/url_shortener');

async function connectToMongoDB(url){
    return mongoose.connect(url);
}

module.exports={connectToMongoDB};