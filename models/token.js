const { Schema, model } = require('mongoose')

const TokenSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Usuario'
    },
    token: {
        type: String,
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: 3600
    }
});

module.exports = model('Token', TokenSchema);