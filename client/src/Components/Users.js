import React, {useState, useEffect} from 'react'
import UserCard from './UserCard'
import {Link} from 'react-router-dom'

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() =>{
        const fetchData = async () => {
            const data = await window.fetch('http://localhost:5000/api/users')
            const json = await data.json()
            setUsers(json)
        }
        fetchData()
    }, [])
    return (
        <>
            {users?.map(user=> 
               <>{!user.isCoach && <Link key={user.id} to={user.id}>
               {user.isPremium && <UserCard user={user} />}
           </Link>}</>
            )}
        </>
    )
}

export default Users