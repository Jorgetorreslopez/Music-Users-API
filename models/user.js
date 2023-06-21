const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = 'life'

const userSchema = new mongoose.Schema ({
    userName: {type: String, required: true},
    password: {type: String, required: true, minlength: 8},
    email: {type: String, required: true},
    loggedIn: { type: Boolean, default: false }
})

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id }, 'life')
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User