import React, {useState, useEffect} from 'react'
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import axios from 'axios';

const CoachExercies = () => {

    let [listData,setlistData] = useState([])

    let usersPrem = []

    let baba = []

    let fetData = async ()=> {
        let usersData = await axios.get(`http://localhost:5000/api/getallexercices`)
         usersPrem = await usersData.data
        console.log(usersPrem)
        setlistData([...listData, usersPrem])
         }

    useEffect( () => {
       
       fetData()
       console.log(listData)

      
      
    }, [])
    
    

    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );

    

    return (
        
        <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={listData}
    
    renderItem={item => (
      <List.Item
        key={item.uid}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.Description} />}
          title={<a href={item.href}>{item.Description}</a>}
          description={item.Description}
        />
        {item.content}
      </List.Item>
    )}
  />
    )
}

export default CoachExercies
