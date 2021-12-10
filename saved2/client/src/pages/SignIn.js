import React from 'react'
import {Routes, Route} from 'react-router-dom'
import SignIn from '../Components/SignIn'


const SignInPage = () => {
    return (
        <Routes>
            <Route path='/' element={<SignIn/>}></Route>
        </Routes>
    )
}

export default SignInPage
