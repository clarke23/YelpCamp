const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})
//  ao utilizar este plugin passportlocalmongoose vai fazer com que adicione sem nos precisarmos manualmente de escrever UserSchema, password etc
UserSchema.plugin(passportLocalMongoose)

// compilar este modelo para poder exportar p outro doc
module.exports = mongoose.model('User', UserSchema)