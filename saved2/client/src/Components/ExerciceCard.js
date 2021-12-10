import React, {useState, useEffect} from 'react'
import {Card, Badge, Modal } from 'antd'
import axios from 'axios'
import {  CheckCircleOutlined ,ExclamationCircleOutlined} from '@ant-design/icons';
const { confirm } = Modal


const { Meta } = Card


const ExerciceCard = ({exercice}) => {
    const [isDone, setIsDone] = useState(exercice.isDone)
    let userId =   localStorage.getItem('userId').replace('"',"").replace('"','').toString()
    console.log('test')
    let isDoneChange = async()=>{
       await axios.patch(`http://localhost:5000/api/addexercices/${userId}/${exercice._id}`)
                    .then(setIsDone(!isDone))
                    .catch(err=>console.log(err))
        
    }
    
    function showConfirm() {
        confirm({
          title: 'Nice WORK !',
          icon: <ExclamationCircleOutlined />,
          content: 'Change exercice to Done ?',
          onOk() {
            isDoneChange()
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    return (
        <div style={{textAlign:'center', width: 350, margin :'1rem'}}>
            { isDone ?
                <Badge style={{ backgroundColor: '#52c41a' }} count='DONE !'>
                    <Card
                    
                    cover={
                    <img 
                        style={{
                            width: '300px',
                            height: '150px',
                            objectFit: 'cover'
                        }}
                        alt={exercice.Name}
                        src={process.env.PUBLIC_URL + `/uploads/${exercice.Name}.png`}
                    />
                    }
                    >
                    <Meta title={exercice.Name.toUpperCase()} description={exercice.Description} />
                </Card>
                </Badge>
            :
            <Badge count='NEW'>
                <Card
                    actions={[
                        <CheckCircleOutlined onClick={showConfirm} />
                    
                      ]}
                    cover={
                    <img 
                        style={{
                            width: '300px',
                            height: '150px',
                            objectFit: 'cover'
                        }}
                        alt={exercice.Name}
                        src={process.env.PUBLIC_URL + `/uploads/${exercice.Name}.png`}
                    />
                    }
                    >
                    <Meta title={exercice.Name.toUpperCase()} description={exercice.Description} />
                </Card>
            </Badge>
            }
        </div>
            
        
    )
}

export default ExerciceCard