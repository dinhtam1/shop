// const mongoose = require('mongoose');

// async function connect() {
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/shop' , {
//             useNewUrlParser: true,
//              useUnifiedTopology: true
//         });
//         console.log('Connect Successful')
//     }   
//     catch (error) {
//         console.log('Connect Fail')

//     }
// }

// module.exports = { connect }








// const mongoose = require('mongoose');

// async function connect() {
//     try {
//         await mongoose.connect('mongodb+srv://trandinhtam911:iwjM7zv0L5WRCIbY@shop.lhhkzct.mongodb.net/shop', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('Connect Successful')
//     }   
//     catch (error) {
//         console.log('Connect Fail' + error.message)

//     }
// }

// module.exports = { connect }



const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect Successful')
    }   
    catch (error) {
        console.log('Connect Fail' + error.message)

    }
}

module.exports = { connect }