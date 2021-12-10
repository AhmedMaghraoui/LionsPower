import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import {Link, useLocation} from 'react-router-dom'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout

const contentStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '3rem 3rem',
    justifyContent :'center'
}

const Coach = ({children}) => {
    let location = useLocation()
    var pth = location.pathname.split('/')[2]
    return (
        
          
          <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu 
                    mode="inline"
                    defaultSelectedKeys={['/members']}
                    selectedKeys={[pth]}
                    style={{ height: '100%', borderleft: 0 }}
              > 
                    <Menu.Item key="members" icon={<UserOutlined />} title="members">
                    <Link to='members'>Members</Link>
                    </Menu.Item>
                    <Menu.Item key="exercices" icon={<UserOutlined />} title="exercices">
                    <Link to='exercices'>Exercices</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserOutlined />} title="members">
                        Members
                    </Menu.Item>
                </Menu>
            </Sider>
            
              
              <Content
                className="site-layout-background"
                style={contentStyle}
                children={children}
              />
                
            
          </Layout>
        
    )
}

export default Coach
