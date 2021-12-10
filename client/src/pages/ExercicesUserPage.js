import React, {useState,useEffect} from 'react'
import { Link} from 'react-router-dom'
import ExerciceCard from '../Components/ExerciceCard'
import { GlobalContext } from '../Components/GlobalContext'
import {useNavigate} from 'react-router'

const contentStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '3rem 3rem',
    justifyContent :'center'
  }

const ExercicesUserPage =  () => {
    let navigate = useNavigate()
    const {globalState, setGlobalState} = React.useContext(GlobalContext)
    console.log(globalState.userId)
    let userId =   localStorage.getItem('userId').replace('"',"").replace('"','').toString()
    console.log(userId)
    const [exercices, setExercices] = useState([])
    useEffect(() =>{
        const fetchData = async () => {
            const data = await window.fetch(`http://localhost:5000/api/users/${userId}`)
            const json = await data.json()
            setExercices(json.Exercices)
        }
        fetchData()
        if (!globalState.token){
            navigate('/meal')
          }
    }, [globalState])
    
    
    
    return (
        <div style={contentStyle}>
           
            {exercices.map(exercice=> 
                 <div key={exercice}>
                    { <ExerciceCard exercice={exercice} />}
                </div>
            )}
            
        
        
       </div>
    )
}

export default ExercicesUserPage
