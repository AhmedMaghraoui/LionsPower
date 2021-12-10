import React, { useEffect } from 'react'
import { GlobalContext } from './GlobalContext'
import {useNavigate} from 'react-router'


const Logout = (props) => {
    const {globalState, setGlobalState} = React.useContext(GlobalContext)
    const navigate = useNavigate()
    useEffect(async () => {
        navigate('http://localhost:3000')

        console.log(globalState.token)
        //let token = globalState.token
        //if (token){
           setGlobalState=({...globalState, token:null, userId: null, isPremium: null,isCoach:null})
        //   console.log(globalState.token)

           localStorage.removeItem("token")
           localStorage.removeItem("userName")
           localStorage.removeItem("userId")
            localStorage.removeItem("isCoach")
            localStorage.removeItem("isPremium")
            
        //    navigate('/signin')
        //    console.log(token)
        //} else {
        //    navigate('/signin')
        //}
    }, [])
    
    return (
        <div>
            
        </div>
    )
}

export default Logout
