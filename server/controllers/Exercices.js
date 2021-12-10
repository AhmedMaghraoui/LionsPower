import userModel from "../models/userModel.js"


export const GetExercices = async (req,res) =>{
    const user = await userModel.findOne({_id:req.params.id})
    const exercices = user.Exercices
    res.json(exercices)
}



export const AddExercice = async (req,res) =>{
    try{
    let user = await userModel.findByIdAndUpdate({_id:req.params.id})
    
    let exercices = user.Exercices
    exercices.push(req.body)
    
    //user.Exercices = exercices
    //user = {...user,Exercices:exercices}
    user.save()
    res.json(user)
    } catch(err) {console.log(err)}

}

export const isDone = async (req,res) =>{
    try{
    let user = await userModel.findByIdAndUpdate({_id:req.params.id})
    let exId = req.params.exid
    let exercice = user.Exercices.find(exercice=>exercice._id == exId)
    let exercices = user.Exercices.exId
    exercice.isDone=!exercice.isDone
    
    //user.Exercices = exercices
    //user = {...user,Exercices:exercices}
    user.save()
    res.json(user)
    } catch(err) {console.log(err)}

}