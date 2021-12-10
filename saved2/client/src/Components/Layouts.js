import React, {useEffect,useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router'
import {Layout, Menu,Modal, Dropdown, Button, message, Space, Tooltip} from 'antd'
import { GlobalContext } from './GlobalContext'
import SignInOrSignUp from './SignInOrSignUp'
import { ExclamationCircleOutlined,LogoutOutlined, UserOutlined  } from '@ant-design/icons';
const { confirm } = Modal
const { Header, Content, Footer} = Layout


const contentStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '3rem 3rem',
    justifyContent :'center'
}

const LPLayouts = ({children}) => {


    const [isModalVisible, setIsModalVisible] = useState(false);
   
    const {globalState, setGlobalState} = React.useContext(GlobalContext)
    let location = useLocation()
    let pth = location.pathname.split('/')[1]

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  

    const navigate = useNavigate()

    const logout = async (e)=>{
        console.log(globalState)
        await setGlobalState({...globalState, token:null, userId: null, isPremium: null,isCoach:null})
        localStorage.clear();
        console.log(globalState)
        console.log(localStorage)
        message.info('You are now logged out.');
        console.log('click', e);
        navigate("/");
    }
    useEffect(() => {
          console.log(globalState.token)
          if (globalState.token) {
            handleOk()
          }
          console.log('test'+ globalState.isPremium)
      }, [globalState.token])
    

      function showConfirm() {
        confirm({
          title: 'Log out',
          icon: <ExclamationCircleOutlined />,
          content: 'Are you sure you want to log out ?',
          onOk() {
            logout()
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
      
      function handleMenuClick(e) {
        showConfirm()
      }
      
      const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
      
        </Menu>)

    return (
      
        <Layout>
          
           <Header>
               <Menu style={{ display: "flex"}} theme='dark' mode='horizontal' defaultSelectedKeys={['/']} selectedKeys={['/'+pth]}>
                                  
                   <Menu.Item key='/'>
                       <Link to='/'>Acceuil</Link>
                   </Menu.Item>
                   <Menu.Item key='/meal'>
                       <Link to='/meal'>MEAL PLAN</Link>
                   </Menu.Item>
                   {globalState.isCoach ? <Menu.Item key='/coaching'><Link to='/coaching'>COACHING</Link>
                   </Menu.Item> : <></>}
                   {!globalState.isCoach && <>{globalState.isPremium ? <Menu.Item key='/exercices'><Link to='/exercices'>EXERCICES</Link>
                   </Menu.Item> : <Menu.Item key='/prices'><Link to='/prices'>PRICES</Link></Menu.Item>}</> }
                   <Menu.Item key='/about'>
                       <Link to='/about'>A propos</Link>
                   </Menu.Item>
                   <Menu.Item key='/contact'>
                       <Link to='/contact'>Contact</Link>
                   </Menu.Item>
                   {!globalState.token ? <Menu.Item style={{ marginLeft: "auto" }} key='/signin'><div onClick={showModal}>Signin</div>
                       
                  </Menu.Item> : <Menu.Item style={{ marginLeft: "auto" }} key='1'>
                    <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
                      {globalState.userName}
                    </Dropdown.Button>
                  </Menu.Item>}
                   
               </Menu>
           </Header>
           <Modal title="Sign in" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                <SignInOrSignUp/>
            </Modal>
           <Content style={contentStyle} children={children} />

           <Footer style={{position:"relative" ,bottom: '0px', textAlign : 'center'}}>Copyright</Footer>
        </Layout>
        
    )
}

export default LPLayouts
