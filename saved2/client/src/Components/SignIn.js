import React from 'react'
import { Form, Input, Button, Checkbox, Alert, message } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router'
import { GlobalContext } from './GlobalContext'



const SignIn = () => {

  const {globalState, setGlobalState} = React.useContext(GlobalContext)
  const {url} = globalState
    const navigate = useNavigate()

    const [token, setToken]= useState(null)
    const [userId, setUserId] = useState(null)

    const [err, setErr] = useState(null)

    useEffect(() => {
      if (token) {
          console.log(token)
      }else {

      }
     
    }, [token, err])
  

    const onFinish = async (values,e) => {
        console.log('Success:', values);
        await axios.post('http://localhost:5000/api/login', values)
              .then(async response=>{
                if (response.status === 200) {
                  setToken(response.data)
                  setUserId(response.data.userId)
                  console.log(response.data)
                  localStorage.setItem("token", JSON.stringify(response.data.token))
                  localStorage.setItem("userId", JSON.stringify(response.data.userId))
                  localStorage.setItem("userName", JSON.stringify(response.data.userName))
                  localStorage.setItem("isCoach", JSON.stringify(response.data.isCoach))
                  localStorage.setItem("isPremium", JSON.stringify(response.data.isPremium))
                  await setGlobalState({
                    ...globalState,
                    token: response.data.token,
                    userId: userId,
                    userName: response.data.userName,
                    isCoach: response.data.isCoach,
                    isPremium: response.data.isPremium
                  })
                  message.info('You are now logged in !');
                  console.log('click', e);
                  if(response.data.isPremium){navigate('/meal')}else{if(!response.data.isCoach){navigate('/prices/')}}
                  if(response.data.isCoach){navigate('/coaching')}
                } else {console.log('lé')}
              })
              
              .catch(err=>setErr({message:"error",description:'Invalid Email Or Password !'}))
       
      }
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true,type: "email", message: 'Please input a valid email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          SignIn
        </Button>
      </Form.Item>
      {err ? <Alert
      message={err.message}
      description={err.description}
      type={err.message}
      showIcon
      /> : null}
    </Form>

    )
}

export default SignIn
