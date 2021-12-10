import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Coach from '../Components/Coach'
import UsersPage from './UsersPage'

const CoachPage = () => {
    return (
    <Coach>
        <Routes>
          <Route path='/members/*' element={<UsersPage/>}></Route>
        </Routes>
    </Coach>
    )
}

export default CoachPage
