import React from 'react'
import {Routes, Route} from 'react-router-dom'
import User from '../Components/User'

import Users from '../Components/Users'

const RoomsPage = () => {
    return (
        <Routes>
            <Route path='/' element={<Users />}></Route>
            <Route path='/:id' element={<User />}></Route>
        </Routes>
    )
}

export default RoomsPage