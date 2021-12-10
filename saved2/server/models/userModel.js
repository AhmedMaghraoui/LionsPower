import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name:{ type:String,
        required: true},
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "invalide Email"],
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    isPremium:{
        type: Boolean,
        default: false
    },
    isCoach:{
        type: Boolean,
        default: false
    },
    Exercices: [{
        Name: String,
        Description: String,
        pic:String,
        isDone: {type:Boolean,
        default:false}
    }]
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const user = this
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
    next()
})

userSchema.methods.isValidePassword = async function(password){
    const user = this
    const isSame = await bcrypt.compare(password, user.password)
    return isSame
}

const userModel = mongoose.model('user', userSchema)

export default userModel