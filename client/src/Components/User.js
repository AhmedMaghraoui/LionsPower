import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import UserCard from './UserCard'
import ExerciceForm from './ExerciceForm'


const User = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    useEffect(() =>{
        const fetchData = async () => {
            const data = await window.fetch(`/api/users/${id}`)
            const json = await data.json()
            setUser(json)
        }
        fetchData()
    }, [])

    return user ? (
        <div>
            <UserCard user={user}/>
            <h2>Add Exercices:</h2>
            <ExerciceForm id={id} user={user} setUser={setUser}/>
        </div>
    ) : null
}

export default User