export const BesoinCalc = async (req,res)=>{
    
        //const calories = {BMR, TDEE}
        try{
            const data = await req.body
            console.log(data)
            let TDEE = null
            console.log(data.activite)
            
                let BMR = (data.genre === "femme") ? 10* data.poids + 6.25* data.taille - 5*data.age - 161
                                                : 10 * data.poids + 6.25* data.taille - 5*data.age + 5 
            BMR = Math.round(BMR)
            switch(data.activite){
            case 1 :
                TDEE = (BMR * 1.25)
            case 2 :
                TDEE = (BMR * 1.4)
            case 3 :
                TDEE = (BMR * 1.6)
            }
            TDEE = Math.round(TDEE)
            let PROT = Math.round(1.8 * data.poids * 4)
            let LIPIDES = Math.round(data.poids * 9)
            let GLUCIDES = Math.round(TDEE - (PROT + LIPIDES))
            const calories = {BMR, TDEE, PROT,LIPIDES, GLUCIDES}
            console.log(calories)
            res.json(calories)
        }catch(err){console.log(err)}
}