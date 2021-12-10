import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Signup from '../Components/Signup'

const SignUpPage = () => {
    return (
        <Routes>
            <Route path='/' element={<Signup/>}></Route>
        </Routes>
    )
}

export default SignUpPage
