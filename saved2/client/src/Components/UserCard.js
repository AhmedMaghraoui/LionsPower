import React, {useState,useEffect} from 'react'
import {Card, Badge,Avatar } from 'antd'
import { useParams } from 'react-router'

const { Meta } = Card


const UserCard = ({user}) => {
        const [exercices, setExercices] = useState([])
        const [exercicesLeft, setExercicesLeft] = useState(0)
        useEffect(async () => {
                const fetchData = async () => {
                       let data = await window.fetch(`http://localhost:5000/api/exercices/${user.id}`)
                                                .then(response=>response.json())
                                                .then(json=>setExercices(json))
                                                .then(data=>data)
                                                .then(console.log('test' + exercices.length))
                    }
                const countLeft= async ()=>{
                         exercices?.forEach(ex=>
                                setExercicesLeft(exercicesLeft+1)
                            )
                }
                     fetchData().then(countLeft()).then(console.log(exercicesLeft))
                     
                    
         console.log(exercicesLeft)       
                
        }, [exercices.length])
        
    return (
       
            <div style={{ width: 300, margin :'2rem'}}>
            {(exercicesLeft === 0) ? 
            <Badge count='No Exercices'>
                
                    <Card style={{ width: 300 }} >
                     <Meta
                       avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                       title={user.name.toUpperCase() }
                       description={user.email}
                     />
                    </Card>
               
            </Badge>
            : <Badge style={{ backgroundColor: '#52c41a' }} count={exercices.length+' Left'}>
                
                    <Card style={{ width: 300 }} >
                     <Meta
                       avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                       title={user.name.toUpperCase()}
                       description={user.email}
                     />
                    </Card>
               
            </Badge>}
        </div>
            
        
    )
}

export default UserCard