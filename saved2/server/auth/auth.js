import passport from "passport"
import { Strategy } from "passport-local"
import userModel from "../models/userModel.js"
import JWT, { ExtractJwt } from 'passport-jwt'
const {Strategy: JWTstrategy, Extract} = JWT
import dotenv from 'dotenv'
dotenv.config()

passport.use('signup',
    new Strategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback : true},
        async (req, email,password,done)=>{
            try{
                const user = await userModel.create({'name':req.body.name,email,password})
                console.log(req.body.name)
                return done(null, user)
            } catch(error) {return done(error)}
        }
    )
)

passport.use(
    'login',
    new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async(email,password, done)=>{
        try {
            const user = await userModel.findOne({email})
            if (!user){
                return done(null, false, { message: 'user not found'})
            } 
            const validate = await user.isValidePassword(password)
            if (!validate){
                return done(null, false, {message: 'mauvai mdp'})
            }

            return done(null, user, {message: 'connected'})

        } catch (error){
            return done(error)
        }
    })

)

passport.use(
    new JWTstrategy({
        secretOrKey:process.env.SECRET,
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter
        },
        async (token, done) =>{
            try{
                return done(null, token.user)
            } catch (error) {
                done (error)
            }
        }
    )
)

export default passport