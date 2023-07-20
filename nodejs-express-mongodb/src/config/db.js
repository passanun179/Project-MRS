const mongoose = require('mongoose')
require('dotenv').config()

const db = mongoose.connection;
const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'

const connect = ()=> {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`Connected to MongoDB : ${URI}`);
    }).catch((err) => {
        console.log('Fail connected to MongoDB',err);
    });
}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = {
    connect
};