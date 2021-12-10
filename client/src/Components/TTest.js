import React, {useState, useEffect} from 'react'
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import axios from 'axios';
const TTest = () => {

  let [listData,setlistData] = useState([])

  let usersPrem = []

  let fetData = async ()=> {
      let usersData = await axios.get(`http://localhost:5000/api/getallexercices`)
       usersPrem = await usersData.data
      console.log(usersPrem)
      setlistData([...listData, usersPrem])
       }

  useEffect( async() => {
     
     fetData()
     console.log(listData)
    
  }, [])
  return (
    <div>
        <List
    itemLayout="horizontal"
    dataSource={listData}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={<a href="https://ant.design">{item.Name}</a>}
          description={item.Description}
        />
      </List.Item>
    )}
  />
    </div>
  )
}

export default TTest
