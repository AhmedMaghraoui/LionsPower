import React from 'react'
import {Routes, Route} from 'react-router-dom'
import UserInfosFormulaire from '../Components/UserInfosFormulaire'

const BMRPage = () => {
    return (
        <Routes>
            <Route path='/' element={<UserInfosFormulaire/>}></Route>
        </Routes>
    )
}

export default BMRPage
