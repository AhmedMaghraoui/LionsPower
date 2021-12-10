import userModel from "../models/userModel.js"


export const GetAllUsers = async (req,res) =>{
    const users = await userModel.find({})
    const json = []
    users.forEach(user=>json.push({id:user._id,email:user.email,name:user.name,isPremium:user.isPremium,isCoach:user.isCoach,Exercices:user.Exercices}))
    res.json(json)
}

export const GetUser = async (req,res) =>{
    const user = await userModel.findOne({_id: req.params.id})
    const json = {id:user._id,email:user.email,name:user.name,isPremium:user.isPremium,isCoach:user.isCoach}
    res.json(user)
}

export const GetAllExercices = async (req,res) =>{
    const users = await userModel.find({})
    const json = []
    users.forEach(user=>json.push({id:user._id,name:user.name,isPremium:user.isPremium,Exercices:user.Exercices}))
    const exercices = []
    json.forEach(user=>{user.Exercices?.forEach(ex=>exercices.push(ex))})
    res.json(exercices)
}

export const Premium = async (req,res) =>{
    const user = await userModel.findOneAndUpdate({_id: req.params.id})
    user.isPremium = true
    user.save()
    res.json(user)
}